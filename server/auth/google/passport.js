'use strict';

import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../../api/user/user.model');
const logger = require('../../components/logger');

export default () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    scope: [
      'https://www.googleapis.com/auth/profile',
      'https://www.googleapis.com/auth/email',
      'https://www.googleapis.com/auth/calendar'
    ]
  },
    (accessToken, refreshToken, profile, done) => {
      const info = profile._json;

      User.findOne({'providers.google.id': profile.id})
        .then(user => {
          if (user) {
            return done(null, user);
          }

          return User.findOne({email: info.email})
            .then(user => {
              if (user) {
                // TODO: maybe ask to connect to user
                return done(null, false, {message: 'email already in use'});
              }

              const newUser = new User({
                name: {
                  first: info.name.givenName,
                  last: info.name.familyName
                },
                email: info.emails[0].value,
                gender: info.gender,
                providers: {
                  google: {
                    id: profile.id,
                    token: accessToken
                  }
                }
              });

              return newUser.saveQ()
                .then(user => {
                  done(null, user);
                })
                .catch(err => {
                  done(err);
                });
            });
        })
        .catch(err => {
          logger.error({err});
          done(err);
        });
    }
  ));
};
