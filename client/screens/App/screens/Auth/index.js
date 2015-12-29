'use strict';

import React from 'react';
import {Route} from 'react-router';
import Login from './screens/Login';
import Register from './screens/Register';

export default (
  <Route>
    <Route path='login' component={Login}/>
    <Route path='register' component={Register}/>
  </Route>
)