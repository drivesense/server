'use strict';

import mongoose from 'mongoose';
import {addSeed} from 'mongoose-plugin-seed';
import seed from './role.seed';
const Schema = mongoose.Schema;

const permissions = [
  'read_users',
  'write_users',
  'read_roles',
  'write_roles'
];

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  permissions: [
    {
      enum: permissions,
      type: String,
      lowercase: true
    }
  ]
});

const Role = mongoose.model('Role', RoleSchema);

addSeed(Role, seed);

export default Role;