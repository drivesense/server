'use strict';

import crypto from 'crypto';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import emailAddress from 'email-address';
import {plugin as seedPlugin} from 'mongoose-plugin-seed';
import seed from './user.seed';
const Schema = mongoose.Schema;

const genders = [
  'male',
  'female'
];

const UserSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  email: {
    match: emailAddress.single,
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  gender: {
    enum: genders,
    type: String,
    lowercase: true
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Role'
    }
  ],
  hashedPassword: {
    type: String,
    select: false
  },
  salt: {
    type: String,
    select: false
  },
  providers: {
    facebook: {
      id: String,
      link: String
    },
    google: {
      id: String,
      link: String
    }
  }
});

/**
 * Plugins
 */
UserSchema
  .plugin(seedPlugin, seed);

/**
 * Virtuals
 */

// TODO: why do we save it?
UserSchema
  .virtual('password')
  .set(function (password) {
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  });

UserSchema
  .virtual('name.full')
  .get(function () {
    return `${this.name.first} ${this.name.last}`;
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function () {
    return {
      name: this.name
    };
  });

// Non-sensitive info we'll be putting in the token
UserSchema
  .virtual('token')
  .get(function () {
    return {
      _id: this._id
    };
  });

UserSchema
  .virtual('socialToken')
  .set(function (socialToken) {
    this.providers = this.providers || {};

    jwt.verify(socialToken.token, process.env.SESSION_SECRET, (err, decoded) => {
      if (err) {
        // TODO: handle error
        return;
      }

      this.providers[socialToken.provider] = decoded;
    });
  });

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function (next) {
    if (!this.isNew) {
      return next();
    }

    // User with providers doesn't need a password
    if (this.hasProvider()) {
      return next();
    }

    if (!(this.hashedPassword && this.hashedPassword.length)) {
      next(new Error('user without providers requires a password'));
    }
    else {
      next();
    }
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText The password
   * @return {Boolean} the password is correct
   */
  authenticate (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * hasProvider - check if user has providers
   * @returns {Boolean} if user has providers
   */
  hasProvider () {
    return this.providers &&
      ((this.providers.facebook && this.providers.facebook.id) ||
      (this.providers.google && this.providers.google.id));
  },

  /**
   * Make salt
   *
   * @return {String} a random salt in base64
   */
  makeSalt: () => crypto.randomBytes(16).toString('base64'),

  /**
   * Encrypt password
   *
   * @param {String} password The password
   * @return {String} the encrypted password
   */
  encryptPassword (password) {
    if (!password || !this.salt) {
      return '';
    }

    const salt = new Buffer(this.salt, 'base64');

    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

export default mongoose.model('User', UserSchema);