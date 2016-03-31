'use strict';

import createError from 'http-errors';

// inject:route-imports
import userRoute from '../../api/user';
import managerRoute from '../../api/manager';
import schoolRoute from '../../api/school';

import authRoute from '../../auth';

export default app => {
  // inject:route-usage
  app.use('/api/users', userRoute);
  app.use('/api/managers', managerRoute);
  app.use('/api/schools', schoolRoute);

  app.use('/auth', authRoute);

  // All undefined api routes should return a 404
  app.route('/:url(api|auth)/*')
    .get((req, res, next) => {
      next(createError(404));
    });
};
