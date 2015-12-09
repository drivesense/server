'use strict';

const passport = require('passport');
const auth = require('../auth.service');

exports.index = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    const error = err || info;

    if (error) {
      return res.status(401).json(error);
    }

    if (!user) {
      return res.status(404).json({message: 'something went wrong, please try again.'});
    }

    res.json({token: auth.signToken(user._id)});
  })(req, res, next);
};