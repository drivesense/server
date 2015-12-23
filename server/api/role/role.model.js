'use strict';

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

export default mongoose.model('Role', RoleSchema);