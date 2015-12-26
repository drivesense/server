import React from 'react';
import { Route, IndexRoute } from 'react-router'
import App from './components/App';
import Shell from './components/Shell';
import AuthRoutes from './screens/Auth';
import HomeRoutes from './screens/Home';
import ManagementRoutes from './screens/Management';

export default (
  <Route path="/" component={App}>
    <Route component={Shell}>
      {HomeRoutes}
      {ManagementRoutes}
    </Route>

    <Route>
      {AuthRoutes}
    </Route>
  </Route>
);