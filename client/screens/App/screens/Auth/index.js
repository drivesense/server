import React from 'react';
import {Route} from 'react-router';
import Login from './components/Login';
import Register from './components/Register';

export default (
  <Route>
    <Route path='login' component={Login}/>
    <Route path='register' component={Register}/>
  </Route>
)