'use strict';

import {Router} from 'express';
const passport = require('passport');
const auth = require('../auth.service');
const controller = require('./controller');

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

  .get('/connect', auth.fillAuthorizationHeaderFromCookie(), auth.isAuthenticated(), passport.authenticate('google', {callbackURL: '/auth/google/connect/callback'}))
  .get('/connect/callback', auth.fillAuthorizationHeaderFromCookie(), auth.isAuthenticated(), controller.connect)

  .post('/disconnect', auth.isAuthenticated(), controller.disconnect);

export default router;