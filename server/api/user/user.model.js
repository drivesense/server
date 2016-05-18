import pify from 'pify';
import mongoose from 'mongoose';
import emailAddress from 'email-address';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './user.seed';
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;

const types = ['admin', 'student', 'teacher'];

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
  type: {
    enum: types,
    type: String,
    lowercase: true,
    required: true
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: 'School'
  },
  manager: Boolean,
  constraints: [{
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    },
    duration: {
      type: Number,
      required: true
    }
  }],
  location: {
    type: [Number],
    index: '2dsphere'
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

/**
 * Methods
 */

// Use promises
UserSchema.methods.setPassword = pify(UserSchema.methods.setPassword);
UserSchema.methods.authenticate = pify(UserSchema.methods.authenticate);

export default createSeedModel('User', UserSchema, seed);