'use strict';

import _ from 'lodash';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import pify from 'pify';
import User from '../api/user/user.model';
import createError from 'http-errors';
const validateJwt = pify(expressJwt({secret: process.env.SESSION_SECRET}));

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 *
 * @returns {Function} middleware
 */
export function isAuthenticated () {
  return (req, res) => {
    // Allow access_token to be passed through query parameter as well
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = `Bearer ${req.query.access_token}`;
    }

    return Promise.resolve();

    return validateJwt(req, res)
      .then(() => {
        return User.findById(req.user._id)
          .populate('roles')
          .exec();
      })
      .then(user => {
        if (!user) {
          return Promise.reject(createError(401));
        }

        req.user = user;
      });
  };
}

export function fillAuthorizationHeaderFromCookie () {
  return req => {
    if (req.cookies && req.cookies.token) {
      // Allow access_token to be passed through the token cookie as well
      let accessToken = req.cookies.token;

      accessToken = accessToken.substring(1, accessToken.length - 1);

      req.headers.authorization = `Bearer ${accessToken}`;
    }
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

  return (req, res) => {
    return isAuthenticated(req, res)
      .then(() => {
        return Promise.resolve();

        const permissions = _.flatten(_.pluck(req.user.roles, 'permissions'));

        if (!_.isEmpty(_.difference(wantedPermissions, permissions))) {
          return Promise.reject(createError(403));
        }
      });
  };
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