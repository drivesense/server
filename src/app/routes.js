import React from 'react';
import { Route, IndexRoute } from 'react-router'
import App from './components/App';
import Shell from './components/shell';
import HomeRoutes from './home';
import AuthRoutes from './auth';
import ManagementRoutes from './management';

export default store => {
  return (
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
}