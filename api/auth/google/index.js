'use strict';

import {Router} from 'express';
import passport from 'passport';
import {isAuthenticated, fillAuthorizationHeaderFromCookie} from '../auth.service';
import * as controller from './controller';

const router = new Router();

router
  .get('/signin', passport.authenticate('google', {
    callbackURL: '/auth/google/signin/callback',
    session: false
  }))
  .get('/signin/callback', passport.authenticate('google', {
    callbackURL: '/auth/google/signin/callback',
    session: false
  }), controller.signin)

  .get('/connect', fillAuthorizationHeaderFromCookie(), isAuthenticated(), passport.authenticate('google', {callbackURL: '/auth/google/connect/callback'}))
  .get('/connect/callback', fillAuthorizationHeaderFromCookie(), isAuthenticated(), controller.connect)

  .post('/disconnect', isAuthenticated(), controller.disconnect);

export default router;