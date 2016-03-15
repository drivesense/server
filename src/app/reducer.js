'use strict';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import leftNav from './components/Shell/redux';
import management from './management/redux';

export default combineReducers({
  routing: routerReducer,
  leftNav: leftNav,
  management: management,
  reduxAsyncConnect
});