'use strict';

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Home from './Home';

export default (
  <Route>
    <IndexRoute component={Home}/>
  </Route>
)