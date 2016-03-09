'use strict';

import pify from 'pify';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import emailAddress from 'email-address';
import {addSeed} from 'mongoose-plugin-seed';
import seed from './user.seed';
import passportLocalMongoose from 'passport-local-mongoose';
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
  .plugin(passportLocalMongoose, {
    usernameField: 'email'
  });

/**
 * Virtuals
 */

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

UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
  });

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function (next) {
    if (!this._password) {
      return next();
    }

    this.setPassword(this._password, () => {
      next();
    });
  });

UserSchema
  .pre('save', function (next) {
    if (!this.isNew) {
      return next();
    }

    // User with providers doesn't need a password
    if (this.hasProvider()) {
      return next();
    }

    if (!(this.hash && this.hash.length)) {
      next(new Error('user without providers requires a password'));
    }
    else {
      next();
    }
  });

/**
 * Methods
 */

// hasProvider - check if user has providers
UserSchema.methods.hasProvider = function () {
  return this.providers &&
    ((this.providers.facebook && this.providers.facebook.id) ||
    (this.providers.google && this.providers.google.id));
};

// Use promises
UserSchema.methods.setPassword = pify(UserSchema.methods.setPassword);
UserSchema.methods.authenticate = pify(UserSchema.methods.authenticate);

const User = mongoose.model('User', UserSchema);

addSeed(User, seed);

export default User;