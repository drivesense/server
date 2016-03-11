'use strict';

import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-simple-promise';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import reducer from './reducer';

export default (history, data) => {
  const middlewares = [thunk, promiseMiddleware(), routerMiddleware(history)];
  let finalCreateStore;

  /*
   In development, patch the create store with dev tools middleware (also support the chrome extension)
   Also use persistState to remember states from the url
   https://github.com/gaearon/redux-devtools
   http://rackt.org/redux/docs/api/compose.html
   */
  if (process.env.NODE_ENV !== 'production' && process.env.WEBPACK_ENV === 'client') {
    const persistState = require('redux-devtools').persistState;
    const DevTools = require('../components/DevTools').default;

    finalCreateStore = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(
        window.location.href.match(/[?&]debug_session=([^&]+)\b/)
      )
    )(_createStore)
  } else {
    finalCreateStore = applyMiddleware(...middlewares)(_createStore)
  }

  return finalCreateStore(reducer, data);
}
