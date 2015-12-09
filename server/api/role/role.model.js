'use strict';

import _ from 'lodash';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const permissions = [
  'read_users',
  'write_users',
  'read_roles',
  'write_roles',
  'read_packages',
  'write_packages'
];

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  permissions: [
    {
      type: String,
      lowercase: true
    }
  ]
});

/**
 * Validations
 */

// Validate permissions
RoleSchema
  .path('name')
  .validate(name => name && name.length, 'role name cannot be empty.');

// Validate name is not taken
RoleSchema
  .path('name')
  .validate(function (name, respond) {
    this.constructor.findOne({name}, (err, role) => {
      if (err) {
        throw err;
      }

      return role ? respond(this.id === role.id) : respond(true);
    });
  }, 'role name already used.');

// Validate permissions
RoleSchema
  .path('permissions')
  .validate(v => v.every(val => _.contains(permissions, val)), 'one or more invalid permissions.');

export default mongoose.model('Role', RoleSchema);