'use strict';

import crypto from 'crypto';
import _ from 'lodash';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import emailAddress from 'email-address';
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
    type: String,
    lowercase: true
  },
  gender: {
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
 * Virtuals
 */

// TODO: why do we save it?
UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
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
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(email => email.length, 'האימייל לא יכול להיות ריק.');

// Validate permissions
UserSchema
  .path('gender')
  .validate(gender => _.contains(genders, gender), 'הוכנס ערך לא נכון לשדה המין.');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function (hashedPassword) {
    // User with providers doesn't need a password
    if (this.providers &&
      ((this.providers.facebook && this.providers.facebook.id) ||
      (this.providers.google && this.providers.google.id))) {
      return true;
    }

    return hashedPassword.length;
  }, 'הסיסמא לא יכולה להיות ריקה.');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function (email, respond) {
    this.constructor.findOne({email}, (err, user) => {
      if (err) {
        throw err;
      }

      if (user) {
        if (this.id === user.id) {
          return respond(true);
        }

        return respond(false);
      }

      respond(true);
    });
  }, 'האימייל הנוכחי נמצא כבר בשימוש.');

// Validate email is in a valid format
UserSchema
  .path('email')
  .validate(email => emailAddress.isValid(email), 'האימייל אינו בפורמט תקין.');

const validatePresenceOf = value => value && value.length;

/**
 * Pre-save hook
 */
UserSchema
  .pre('save', function (next) {
    if (!this.isNew) {
      return next();
    }

    // User with providers doesn't need a password
    if (this.providers &&
      ((this.providers.facebook && this.providers.facebook.id) ||
      (this.providers.google && this.providers.google.id))) {
      return next();
    }

    if (!validatePresenceOf(this.hashedPassword)) {
      next(new Error('סיסמא שגוייה.'));
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