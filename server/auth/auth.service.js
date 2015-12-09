'use strict';

import _ from 'lodash';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../api/user/user.model';
const validateJwt = expressJwt({secret: process.env.SESSION_SECRET});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 *
 * @returns {Function} middleware
 */
export function isAuthenticated () {
  return compose()
    .use((req, res, next) => {
      // Allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`;
      }

      validateJwt(req, res, next);
    })

    // Attach user to request
    .use((req, res, next) => {
      User.findById(req.user._id)
        .populate('roles')
        .exec((err, user) => {
          if (err) {
            return next(err);
          }

          if (!user) {
            return res.status(401).end();
          }

          req.user = user;
          next();
        });
    });
}

export function fillAuthorizationHeaderFromCookie () {
  return (req, res, next) => {
    if (req.cookies && req.cookies.token) {
      // Allow access_token to be passed through the token cookie as well
      let accessToken = req.cookies.token;

      accessToken = accessToken.substring(1, accessToken.length - 1);

      req.headers.authorization = `Bearer ${accessToken}`;
    }

    next();
  };
}

/**
 * Checks if the user permission meets the minimum requirements of the route
 *
 * @returns {Function} middleware
 */
export function hasPermissions () {
  if (!arguments) {
    throw new Error('Required permission needs to be set');
  }

  const wantedPermissions = arguments;

  return compose()
    .use(isAuthenticated())
    .use((req, res, next) => {
      const permissions = _.flatten(_.pluck(req.user.roles, 'permissions'));

      if (!_.isEmpty(_.difference(wantedPermissions, permissions))) {
        return res.status(403).end();
      }

      next();
    });
}

/**
 * Returns a jwt token signed by the app secret
 *
 * @param {ObjectId} id the user id to keep in the jwt
 * @returns {String} signed jwt token
 */
export function signToken (id) {
  return jwt.sign({_id: id}, process.env.SESSION_SECRET, {expiresInMinutes: 300});
}

/**
 * Set token cookie directly for oAuth strategies
 *
 * @param {Object} req the express request object
 * @param {Object} res the express response object
 */
export function setTokenCookie (req, res) {
  if (!req.user) {
    res.status(404).json({message: 'something went wrong, try again'});
    return;
  }

  const token = signToken(req.user._id.toString());

  res.cookie('token', JSON.stringify(token));
  res.redirect('/');
}