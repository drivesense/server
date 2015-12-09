'use strict';

import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import User from '../../api/user/user.model';
import logger from '../../components/logger';

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