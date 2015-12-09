'use strict';

import Role from '../../api/role/role.model';

export default () => {
  return Role.remove({})
    .exec()
    .then(() => Role.create([{
      name: 'admin',
      permissions: [
        'read_users',
        'write_users',
        'read_roles',
        'write_roles',
        'read_packages',
        'write_packages'
      ]
    }]));
};