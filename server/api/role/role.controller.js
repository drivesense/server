'use strict';

import User from '../user/user.model';
import Role from './role.model';
import HttpError from '../../components/errors/http-error';
import _ from 'lodash';

// Get list of roles
export function index () {
  return Role.find({});
}

// Get a single role
export function show (req) {
  return Role.findById(req.params.id)
    .then(role => {
      if (!role) {
        return Promise.reject(new HttpError(404));
      }

      return role;
    });
}

// Creates a new role in the DB.
export function create (req) {
  return new Role(req.body).save()
    .then(role => {
      if (!role) {
        return Promise.reject(new HttpError(404));
      }

      return role;
    });
}

// Updates an existing role in the DB.
export function update (req) {
  const data = _.pick(req.body, ['name', 'permissions']);

  return Role.findById(req.params.id)
    .then(role => {
      if (!role) {
        return Promise.reject(new HttpError(404));
      }

      role.set(data);

      return role.saveQ();
    })
    .then(_.noop);
}

// Deletes a role from the DB.
export function destroy (req) {
  return Role.findOneAndRemove({_id: req.params.id})
    .then(role => {
      if (!role) {
        return Promise.reject(new HttpError(404));
      }

      return User.update(
        {roles: role._id},
        {$pull: {roles: role._id}},
        {multi: true}
      );
    })
    .then(_.noop);
}