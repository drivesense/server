import React from 'react';
import {Route, IndexRoute} from 'react-router';
import NavList from './components/NavList';
import Users from './components/Users';
import Roles from './components/Roles';

export default (
  <Route component={NavList}>
    <Route path='users' component={Users}/>
    <Route path='roles' component={Roles}/>
  </Route>
)