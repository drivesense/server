'use strict';

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Home from './Home';
import Profile from './Profile/redux';

export default function () {
  return (
    <Route>
      <IndexRoute component={Home}/>
      <Route path='profile' component={Profile}/>
    </Route>
  )
}