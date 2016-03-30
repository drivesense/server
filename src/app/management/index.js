'use strict';

import React from 'react';
import {Route} from 'react-router';
import Managers from './Managers';

export default (
  <Route path='management'>
    <Route path='managers' component={Managers}/>
  </Route>
)