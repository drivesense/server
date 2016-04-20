'use strict';

import React from 'react';
import {Route} from 'react-router';
import Managers from './Managers';
import Schools from './Schools';
import {requireRole} from '../auth/routing';

export default function (store) {
  return (
    <Route path='management'>
      <Route path='managers' component={Managers} {...requireRole(store, 'admin')}/>
      <Route path='schools' component={Schools} {...requireRole(store, 'admin')}/>
    </Route>
  )
}