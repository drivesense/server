'use strict';

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Management from './components/Management';
import UsersContainer from './screens/Users';
import Roles from './screens/Roles';

export default (
  <Route path='management' component={Management}>
    <Route path='users' component={UsersContainer}/>
    <Route path='roles' component={Roles}/>
  </Route>
)