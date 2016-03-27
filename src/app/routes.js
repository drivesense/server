import React from 'react';
import { Route, IndexRoute } from 'react-router'
import App from './components/App';
import Shell from './components/shell';
import HomeRoutes from './home';
import AuthRoutes from './auth';
import ManagementRoutes from './management';
import {isAuthenticated, loadUser} from './auth/redux';

export default store => {
  const requireLogin = (nextState, replace, cb) => {
    if (!isAuthenticated(store.getState())) {
      replace('/login');
    }

    cb();
  };

  return (
    <Route path="/" component={App}>
      <Route component={Shell} onEnter={requireLogin}>
        {HomeRoutes}
        {ManagementRoutes}
      </Route>

      <Route>
        {AuthRoutes}
      </Route>
    </Route>
  );
}