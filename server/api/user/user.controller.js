'use strict';

import User from './user.model';
import Role from '../role/role.model';
import HttpError from '../../components/errors/http-error';
import {signToken} from '../../auth/auth.service';
import _ from 'lodash';

// Get list of users
export function index () {
  return User.find({});
}

// Creates a new user
export function create (req) {
  return new User(req.body).save()
    .then(user => {
      if (!user) {
        return Promise.reject(new HttpError(404));
      }

      return {
        token: signToken(user._id)
      };
    });
}

// Get a single user
export function show (req) {
  return User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return Promise.reject(new HttpError(404));
      }

      return user.profile;
    });
}

// Deletes a user
export function destroy (req) {
  return User.findOneAndRemove({_id: req.params.id})
    .then(user => {
      if (!user) {
        return Promise.reject(new HttpError(404));
      }
    });
}

// Change a users password
export function changePassword (req) {
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  return User.findByIdQ(req.user._id, 'salt hashedPassword')
    .then(user => {
      if (!user) {
        return Promise.reject(new HttpError(404));
      }

      if (user.authenticate(oldPass)) {
        user.password = newPass;

        return user.save();
      }

      return Promise.reject(new HttpError(403));
    })
    .then(_.noop);
}

// Updates an existing user in the DB.
export function update (req) {
  const data = _.pick(req.body, ['name', 'email', 'gender']);

  return User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return Promise.reject(new HttpError(404));
      }

      user.set(data);

      return user.save();
    })
    .then(_.noop);
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
        return Promise.reject(new HttpError(404));
      }

      if (_.find(user.roles, id => id.equals(role._id))) {
        return Promise.reject(new HttpError(409));
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
        return Promise.reject(new HttpError(404));
      }

      if (!_.find(user.roles, id => id.equals(role._id))) {
        return Promise.reject(new HttpError(409));
      }
      _.remove(user.roles, id => id.equals(role._id));

      user.markModified('roles');

      return user.save();
    })
    .then(_.noop);
}
