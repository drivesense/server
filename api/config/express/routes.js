'use strict';

import createError from 'http-errors';

// inject:route-imports
import roleRoute from '../../api/role';
import userRoute from '../../api/user';

import authRoute from '../../auth';

export default app => {
  // inject:route-usage
  app.use('/api/roles', roleRoute);
  app.use('/api/users', userRoute);

  app.use('/auth', authRoute);

  // All undefined api routes should return a 404
  app.route('/:url(api|auth)/*')
    .get((req, res, next) => {
      next(createError(404));
    });
};
