'use strict';

import {Router} from 'express';
import passport from 'passport';
const auth = require('../auth.service');
const controller = require('./controller');

const router = new Router();

router
  .get('/signin', passport.authenticate('facebook', {
    callbackURL: '/auth/facebook/signin/callback',
    session: false
  }))
  .get('/signin/callback', passport.authenticate('facebook', {
    successURL: '/',
    callbackURL: '/auth/facebook/signin/callback',
    session: false
  }), controller.signin)

  .get('/connect', auth.fillAuthorizationHeaderFromCookie(), auth.isAuthenticated(), passport.authenticate('facebook', {callbackURL: '/auth/facebook/connect/callback'}))
  .get('/connect/callback', auth.fillAuthorizationHeaderFromCookie(), auth.isAuthenticated(), controller.connect)

  .post('/disconnect', auth.isAuthenticated(), controller.disconnect);

export default router;