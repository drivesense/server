'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../api/user/user.model');
const logger = require('../../components/logger');

export default () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // This is the virtual field on the model
  },
    (email, password, done) => {
      User.findOne({email: email.toLowerCase()}, 'salt hashedPassword')
        .then(user => {
          if (!user || !user.authenticate(password)) {
            return done(null, false, {message: 'Invalid email or password'});
          }

          return done(null, user);
        })
        .catch(err => {
          logger.error({err});
          done(err);
        });
    }

  ));
};