'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import {render} from 'react-dom';
import { hashHistory } from 'react-router';
import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createStore from './config/createStore';
import App from './screens/App';
import Root from './components/Root';
import leftNav from './screens/App/shared/redux/left-nav';
import management from './screens/App/screens/Management/shared/redux/management/index';
import styles from './index.less';

injectTapEventPlugin();

const rootReducer = combineReducers({
  routing: routerReducer,
  leftNav: leftNav,
  management: management
});
const store = createStore(rootReducer);

// Sync allows to listen to history changes and change location through redux
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Root store={store} history={history} routes={App}/>,
  document.getElementById('container')
);