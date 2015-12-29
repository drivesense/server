'use strict';

import { createStore, applyMiddleware, compose } from 'redux';
import {persistState} from 'redux-devtools';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import DevTools from '../components/DevTools';

const middlewares = [thunk, promise()];
let finalCreateStore;

/*
 In development, patch the create store with dev tools middleware (also support the chrome extension)
 Also use persistState to remember states from the url
 https://github.com/gaearon/redux-devtools
 http://rackt.org/redux/docs/api/compose.html
 */
if (process.env.NODE_ENV === 'production') {
  finalCreateStore = applyMiddleware(...middlewares)(createStore)
} else {
  finalCreateStore = compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
    persistState(
      window.location.href.match(/[?&]debug_session=([^&]+)\b/)
    )
  )(createStore)
}

export default finalCreateStore;
