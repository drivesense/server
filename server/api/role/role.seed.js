'use strict';

export default {
  model: 'Role',
  seed: () => [{
    name: 'admin',
    permissions: [
      'read_users',
      'write_users',
      'read_roles',
      'write_roles',
      'read_packages',
      'write_packages'
    ]
  }]
};