'use strict';

import React from 'react';
import {Route} from 'react-router';
import Login from './Login';
import Signup from './Signup';

export default (
  <Route>
    <Route path='login' component={Login}/>
    <Route path='signup' component={Signup}/>
  </Route>
)