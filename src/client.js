'use strict';

import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from './config/create-store';
import createRoutes from './screens/App';
import Root from './components/Root';
import styles from './index.less';

injectTapEventPlugin();

const store = createStore(browserHistory, window.__data);

// Sync allows to listen to history changes and change location through redux
const history = syncHistoryWithStore(browserHistory, store);

const routes = createRoutes(store);

render(
  <Root store={store} history={history} routes={routes}/>,
  document.getElementById('content')
);