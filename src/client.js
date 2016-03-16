'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import {render} from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './app/create-store';
import createRoutes from './app/routes';
import createClient from './helpers/client';
import Root from './components/Root';

injectTapEventPlugin();

const client = createClient();
const store = createStore(browserHistory, client, window.__data);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);
const context = {insertCss: styles => styles._insertCss()};

render(
  <Root store={store} context={context}>
    <Router history={history} render={(props) => <ReduxAsyncConnect {...props}/>}>
      {routes}
    </Router>
  </Root>,
  document.getElementById('content')
);

if (process.env.NODE_ENV !== 'production' && process.env.WEBPACK_ENV === 'client') {
  render(
    <Root store={store} context={context} renderDevTools={true}>
      <Router history={history} render={(props) => <ReduxAsyncConnect {...props}/>}>
        {routes}
      </Router>
    </Root>,
    document.getElementById('content')
  );
}