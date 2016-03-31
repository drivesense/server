'use strict';

import React from 'react';
import {Route} from 'react-router';
import Managers from './Managers';
import Schools from './Schools';

export default (
  <Route path='management'>
    <Route path='managers' component={Managers}/>
    <Route path='schools' component={Schools}/>
  </Route>
)