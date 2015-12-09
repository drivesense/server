'use strict';

import path from 'path';
import roleRoute from './api/role';
import userRoute from './api/user';
import authRoute from './auth';

export default app => {
  app.use('/api/roles', roleRoute);
  app.use('/api/users', userRoute);

  app.use('/auth', authRoute);

  // All undefined api routes should return a 404
  app.route('/:url(api|auth)/*')
    .get((req, res) => res.status(404).send('opps'));

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => res.sendFile(path.resolve('client/index.html')));
};