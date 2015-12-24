'use strict';

import mongoose from 'mongoose';
import {plugin as seedPlugin} from 'mongoose-plugin-seed';
import seed from './role.seed';
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

/**
 * Plugins
 */
RoleSchema
  .plugin(seedPlugin, seed);

export default mongoose.model('Role', RoleSchema);