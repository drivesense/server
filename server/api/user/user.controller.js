'use strict';

import User from './user.model';
import Role from '../role/role.model';
import createError from 'http-errors';
import {signToken} from '../../auth/auth.service';
import _ from 'lodash';

const errorIfEmpty = result => !result ? Promise.reject(createError(404)) : result;

// Get list of users
export function index () {
  return User.find({});
}

// Get a single user
export function show (req) {
  return User.findById(req.params.id)
    .then(errorIfEmpty);
}

// Creates a new user
export function create (req) {
  return new User(req.body).save()
    .then(errorIfEmpty)
    .then(user => {
      return {
        token: signToken(user._id)
      };
    });
}

// Updates an existing user in the DB.
export function update (req) {
  const data = _.pick(req.body, ['name', 'email', 'gender']);

  return User.findById(req.params.id)
    .then(errorIfEmpty)
    .then(user => {
      user.set(data);

      return user.save();
    })
    .then(_.noop);
}

// Deletes a user
export function destroy (req) {
  return User.findOneAndRemove({_id: req.params.id})
    .then(errorIfEmpty)
    .then(_.noop);
}

// Change a users password
export function changePassword (req) {
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  return User.findByIdQ(req.user._id)
    .then(errorIfEmpty)
    .then(user => {
      return user.authenticate(oldPass)
        .then(isAuth => {
          if (isAuth) {
            return user.setPassword(newPass);
          }

          return Promise.reject(createError(403));
        })
        .then(_.noop);
    });
}

// Get my info
export function me (req) {
  return Promise.resolve(req.user);
}

// Add role to user
export function addRole (req) {
  return Promise.all([User.findById(req.params.id), Role.findById(req.body.roleId)])
    .spread((user, role) => {
      if (!user || !role) {
        return Promise.reject(createError(404));
      }

      if (_.find(user.roles, id => id.equals(role._id))) {
        return Promise.reject(createError(409));
      }

      user.roles.push(role);

      return user.save();
    })
    .then(_.noop);
}

// Remove role from user
export function removeRole (req) {
  return Promise.all([User.findById(req.params.id), Role.findById(req.body.roleId)])
    .spread((user, role) => {
      if (!user || !role) {
        return Promise.reject(createError(404));
      }

      if (!_.find(user.roles, id => id.equals(role._id))) {
        return Promise.reject(createError(409));
      }
      _.remove(user.roles, id => id.equals(role._id));

      user.markModified('roles');

      return user.save();
    })
    .then(_.noop);
}
