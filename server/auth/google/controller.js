'use strict';

const passport = require('passport');
const User = require('../../api/user/user.model');
const auth = require('../auth.service');

exports.signin = (req, res) => {
  auth.setTokenCookie(req, res);
};

exports.connect = (req, res, next) => {
  // TODO: already connected ?

  passport.authenticate('google', {callbackURL: '/auth/google/connect/callback'}, (err, user, info) => {
    if (err || !info) {
      // TODO: what?
      return res.redirect('/');
    }

    User.findOne({'providers.google.id': info.id}, (err, user) => {
      if (err) {
        // TODO: what?
        return next(err);
      }

      if (user) {
        // TODO: what?!
        return res.redirect('/');
      }

      // TODO: req user undefined?
      User.update({_id: req.user._id}, {
        'providers.google': {
          id: info.id,
          link: info.link
        }
      }, {multi: false}, err => {
        if (err) {
          // TODO: what?
          return next(err);
        }

        return res.redirect('/');
      });
    });
  })(req, res, next);
};

exports.disconnect = (req, res, next) => {
  User.update({_id: req.user._id}, {$unset: {'providers.google': true}}, {multi: false}, err => {
    if (err) {
      // TODO: what?
      return next(err);
    }

    return res.status(204).end();
  });
};