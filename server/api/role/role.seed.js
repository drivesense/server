'use strict';

export default {
  seed: () => [{
    name: 'admin',
    permissions: [
      'read_users',
      'write_users',
      'read_roles',
      'write_roles'
    ]
  }]
};