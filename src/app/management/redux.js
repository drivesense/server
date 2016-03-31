'use strict';

import { combineReducers } from 'redux';
import managers from './Managers/redux';
import schools from './Schools/redux';

export default combineReducers({
  managers,
  schools
})