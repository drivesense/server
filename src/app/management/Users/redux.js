'use strict';

import { resolve, reject } from 'redux-simple-promise';
const LOAD_USERS = 'management/LOAD_USERS';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USERS:
      return Object.assign({}, state, {
        loading: true,
        loaded: false
      });
    case resolve(LOAD_USERS):
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        users: action.payload
      });
    case reject(LOAD_USERS):
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: action.payload
      });
    default:
      return state;
  }
}

export function loadUsers() {
  return {
    type: LOAD_USERS,
    payload: {
      promise: client => client.get('/api/users').then(res => res.data)
    }
  };
}
