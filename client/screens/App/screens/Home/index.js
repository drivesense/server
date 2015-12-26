import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Home from './components/Home';
import About from './components/About';

export default (
  <Route>
    <IndexRoute component={Home}/>
    <Route path="about" component={About}/>
  </Route>
)