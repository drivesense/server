'use strict';

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as form } from 'redux-form';
import leftNav from './components/Shell/redux';
import management from './management/redux';
import auth from './auth/redux';

export default combineReducers({
  routing: routerReducer,
  form,
  auth,
  leftNav,
  management,
  reduxAsyncConnect
});