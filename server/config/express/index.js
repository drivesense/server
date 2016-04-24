'use strict';

import {resolve, normalize, join} from 'path';
import morgan from 'morgan';
import compression from 'compression';
import {urlencoded, json} from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'api-error-handler';
import passport from 'passport';
import express from 'express';
import routes from './routes';

export default app => {
  const env = process.env.NODE_ENV;
  const client = normalize(join(__dirname, '../../..', 'client'));

  app.use(compression());
  app.use(urlencoded({extended: false}));
  app.use(json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(express.static(client));

  if (env !== 'production') {
    app.use(morgan('dev'));
    app.use(require('connect-livereload')());
  }

  routes(app);

  app.route('/*')
    .get((req, res) => res.sendFile(resolve(client, 'index.html')));

  app.use(errorHandler());
};
