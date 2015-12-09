'use strict';

import _ from 'lodash';
import Role from './role.model';
import User from '../user/user.model';
import logger from '../../components/logger';

// Get list of roles
export function index (req, res) {
  Role.find({})
    .then(roles => {
      if (!roles) {
        res.status(404).end();
      }
      else {
        res.status(200).json(roles);
      }
    })
    .catch(err => {
      logger.error({
        err,
        req
      });

      res.status(500).end();
    });
}

// Get a single role
export function show (req, res) {
  Role.findById(req.params.id)
    .then(role => {
      if (!role) {
        res.status(404).end();
      }
      else {
        res.status(200).json(role);
      }
    })
    .catch(err => {
      logger.error({
        err,
        req
      });

      res.status(500).end();
    });
}

// Creates a new role in the DB.
export function create (req, res) {
  const newRole = new Role(req.body);

  newRole.save()
    .then(role => {
      if (!role) {
        res.status(500).end();
      }
      else {
        res.status(201).json(role);
      }
    })
    .catch(err => {
      logger.error({
        err,
        req
      });

      res.status(500).end();
    });
}

// Updates an existing role in the DB.
export function update (req, res) {
  // TODO: decide what more to pick
  const data = _.pick(req.body, ['name', 'permissions']);

  Role.findById(req.params.id)
    .then(role => {
      if (!role) {
        res.status(404).end();
      }
      else {
        role.set(data);

        return role.saveQ();
      }
    })
    .then(() => {
      res.status(200).end();
    })
    .catch(err => {
      logger.error({
        err,
        req
      });

      res.status(500).end();
    });
}

// Deletes a role from the DB.
export function destroy (req, res) {
  Role.findOneAndRemove({_id: req.params.id})
    .then(role => {
      if (!role) {
        return res.status(404).end();
      }

      res.status(204).end();

      return User.update(
        {roles: role._id},
        {$pull: {roles: role._id}},
        {multi: true}
      );
    })
    .catch(err => {
      logger.error({
        err,
        req
      });

      res.status(500).end();
    });
}