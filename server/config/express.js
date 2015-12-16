'use strict';

import morgan from 'morgan';
import compression from 'compression';
import {urlencoded, json} from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import passport from 'passport';

export default app => {
  app.use(compression());
  app.use(urlencoded({extended: false}));
  app.use(json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(morgan('dev'));

  if (process.env.NODE_ENV !== 'production') {
    app.use(errorHandler()); // Error handler - has to be last
  }
};
