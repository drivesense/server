'use strict';

import path from 'path';

export default app => {
  // Insert routes below
  app.use('/api/roles', require('./api/role'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined api routes should return a 404
  app.route('/:url(api|auth)/*')
    .get((req, res) => res.status(404).send('opps'));

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => res.sendFile(path.resolve('client/index.html')));
};