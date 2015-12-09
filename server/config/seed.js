'use strict';

import populateUsers from './seed-data/users';
import populateRoles from './seed-data/roles';

export default () => populateRoles()
    .then(roles => populateUsers(roles))
    .then(() => {
      console.log('Finished populating database.');
    })
    .catch(err => {
      console.log(`Unable to populate database: ${err}`);
    });