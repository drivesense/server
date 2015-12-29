'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import {render} from 'react-dom';
import { combineReducers } from 'redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import {createHashHistory, createHistory} from 'history';
import createStore from './config/createStore';
import App from './screens/App';
import Root from './components/Root';
import leftNav from './screens/App/shared/redux/left-nav';
import management from './screens/App/screens/Management/shared/redux/management/index';

injectTapEventPlugin();

const rootReducer = combineReducers({
  routing: routeReducer,
  leftNav: leftNav,
  management: management
});
const history = createHashHistory();
const store = createStore(rootReducer);

// Sync allows to listen to history changes and change location through redux
syncReduxAndRouter(history, store);

render(
  <Root store={store} history={history} routes={App} />,
  document.getElementById('container')
);