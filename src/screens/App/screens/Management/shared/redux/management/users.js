'use strict';

const LOAD_USERS = 'management/LOAD_USERS';
const LOAD_USERS_PENDING = 'management/LOAD_USERS_PENDING';
const LOAD_USERS_FULFILLED = 'management/LOAD_USERS_FULFILLED';
const LOAD_USERS_REJECTED = 'management/LOAD_USERS_REJECTED';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USERS_PENDING:
      return Object.assign({}, state, {
        loading: true,
        loaded: false
      });
    case LOAD_USERS_FULFILLED:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        users: action.payload
      });
    case LOAD_USERS_REJECTED:
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: action.error
      });
    default:
      return state;
  }
}

export function loadUsers() {
  return {
    type: LOAD_USERS,
    payload: {
      promise: new Promise((yes, no) => setTimeout(() => yes([{gender: 'Male'}, {gender: 'Female'}]), 3000))
    }
  };
}
