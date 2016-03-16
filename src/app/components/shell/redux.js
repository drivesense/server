'use strict';

import { push } from 'react-router-redux'

const TOGGLE = 'left-nav/TOGGLE';

const initialState = {
  open: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE:
      return Object.assign({}, state, {
        open: action.payload.open === null ? !state.open : action.payload.open
      });
    default:
      return state;
  }
}

export function redirect(url) {
  return push(url);
}

export function toggle(open = null) {
  return {
    type: TOGGLE,
    payload: {
      open
    }
  };
}