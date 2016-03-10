'use strict';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import leftNav from '../screens/App/shared/redux/left-nav';
import management from '../screens/App/screens/Management/shared/redux/management/index';

export default combineReducers({
  routing: routerReducer,
  leftNav: leftNav,
  management: management,
  reduxAsyncConnect
});