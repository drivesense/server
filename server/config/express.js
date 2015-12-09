'use strict';

import morgan from 'morgan';
import compression from 'compression';
import {urlencoded, json} from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import {join} from 'path';
import passport from 'passport';
import ejs from 'ejs';

export default app => {
  app.set('views', join('server', 'views'));
  app.set('view engine', 'html');
  app.engine('html', ejs.renderFile);
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
