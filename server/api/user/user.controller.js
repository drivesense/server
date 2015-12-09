'use strict';

import User from './user.model';
import Role from '../role/role.model';
import logger from '../../components/logger';
import {signToken} from '../../auth/auth.service';
import _ from 'lodash';

/**
 * Get list of users
 *
 * @param {Object} req the express request object
 * @param {Object} res the express response object
 */
export function index (req, res) {
  User.find({})
    .then(users => {
      if (!users) {
        res.status(404).end();
      }
      else {
        res.status(200).json(users);
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

/**
 * Creates a new user
 *
 * @param {Object} req the express request object
 * @param {Object} res the express response object
 */
export function create (req, res) {
  const newUser = new User(req.body);

  newUser.save()
    .then(user => {
      res.json({
        token: signToken(user._id)
      });
    }, err => {
      res.status(422).json(err);
    })
    .catch(err => {
      logger.error({
        err,
        req
      });
    });
}

/**
 *
 * Get a single user
 *
 * @param {Object} req the express request object
 * @param {Object} res the express response object
 */
export function show (req, res) {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).end();
      }
      else {
        res.status(200).json(user.profile);
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

/**
 * Deletes a user
 *
 * @param {Object} req the express request object
 * @param {Object} res the express response object
 */
export function destroy (req, res) {
  User.findOneAndRemove({_id: req.params.id})
    .then(user => {
      if (!user) {
        res.status(404).end();
      }
      else {
        res.status(204).end();
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

/**
 * Change a users password
 *
 * @param {Object} req the express request object
 * @param {Object} res the express response object
 */
export function changePassword (req, res) {
  const oldPass = String(req.body.oldPassword);
  const newPass = String(req.body.newPassword);

  User.findByIdQ(req.user._id, 'salt hashedPassword')
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;

        return user.save();
      }

      res.status(403).end();
    })
    .then(() => res.status(200).end())
    .catch(err => {
      logger.error({
        err,
        req
      });

      res.status(500).end();
    });
}

// Updates an existing user in the DB.
export function update (req, res) {
  const data = _.pick(req.body, ['name', 'email', 'gender']);

  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }

      user.set(data);

      return user.save();
    })
    .then(() => res.status(200).end())
    .catch(err => {
      logger.error({
        err,
        req
      });

      res.status(500).end();
    });
}

/**
 * Get my info
 *
 * @param {Object} req the express request object
 * @param {Object} res the express response object
 */
export function me (req, res) {
  res.json(req.user);
}

/**
 * Add role to user
 *
 * @param {Object} req the express request object
 * @param {Object} res the express response object
 */
export function addRole (req, res) {
  Promise.all([User.findById(req.params.id), Role.findById(req.body.roleId)])
    .spread((user, role) => {
      if (!user || !role) {
        return res.status(404).end();
      }

      if (_.find(user.roles, id => id.equals(role._id))) {
        return res.status(409).end();
      }

      user.roles.push(role);

      return user.save();
    })
    .then(() => res.status(200).end())
    .catch(err => {
      logger.error({
        err,
        req
      });

      res.status(500).end();
    });
}

/**
 * Remove role from user
 *
 * @param {Object} req the express request object
 * @param {Object} res the express response object
 */
export function removeRole (req, res) {
  Promise.all([User.findById(req.params.id), Role.findById(req.body.roleId)])
    .spread((user, role) => {
      if (!user || !role) {
        return res.status(404).end();
      }

      if (!_.find(user.roles, id => id.equals(role._id))) {
        return res.status(409).end();
      }
      _.remove(user.roles, id => id.equals(role._id));

      user.markModified('roles');

      return user.save();
    })
    .then(() => res.status(200).end())
    .catch(err => {
      logger.error({
        err,
        req
      });

      res.status(500).end();
    });
}
