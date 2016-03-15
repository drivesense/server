'use strict';

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Users from './Users';
import Roles from './Roles';

export default (
  <Route path='management'>
    <Route path='users' component={Users}/>
    <Route path='roles' component={Roles}/>
  </Route>
)