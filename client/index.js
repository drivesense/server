import React from 'react';
import {render} from 'react-dom';
import { combineReducers } from 'redux';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import createStore from './config/createStore';
import App from './screens/App';
import Root from './components/Root';
import {createHistory} from 'history';

const rootReducer = combineReducers({
  routing: routeReducer
});
const history = createHistory();
const store = createStore(rootReducer);

// Sync allows to listen to history changes and change location through redux
syncReduxAndRouter(history, store);

render(
  <Root store={store} history={history} routes={App} />,
  document.getElementById('container')
);