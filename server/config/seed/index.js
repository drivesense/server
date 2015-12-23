'use strict';

// inject:seed-imports
import populateUsers from './users';
import populateRoles from './roles';

import logger from '../../components/logger';

export default () => populateRoles()
  .then(roles => populateUsers(roles))

  // inject:seed-populate
  .then(() => {
    logger.info('Finished populating database.');
  })
  .catch(err => {
    logger.error({err}, 'Unable to populate database');
  });