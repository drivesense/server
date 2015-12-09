'use strict';

import populateUsers from './seed-data/users';
import populateRoles from './seed-data/roles';
import logger from '../components/logger';

export default () => populateRoles()
    .then(roles => populateUsers(roles))
    .then(() => {
      logger.info('Finished populating database.');
    })
    .catch(err => {
      logger.info(`Unable to populate database: ${err}`);
    });