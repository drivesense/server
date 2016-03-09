'use strict';

import { push } from 'react-router-redux'

const TOGGLE = 'left-nav/TOGGLE';
const SET_OPEN = 'left-nav/SET_OPEN';

const initialState = {
  open: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE:
      return Object.assign({}, state, {
        open: !state.open
      });
    case SET_OPEN:
      return Object.assign({}, state, {
        open: action.payload.open
      });
    default:
      return state;
  }
}

export function navigateTo(url) {
  return push(url);
}

export function toggle() {
  return {
    type: TOGGLE
  };
}

export function setOpen(open) {
  return {
    type: SET_OPEN,
    payload: {
      open
    }
  };
}