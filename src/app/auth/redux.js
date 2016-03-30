import {resolve, reject} from 'redux-simple-promise';
import {push} from 'react-router-redux'
import cookie from 'react-cookie';

const LOGIN = 'auth/LOGIN';
const LOGOUT = 'auth/LOGOUT';
const LOAD_USER = 'auth/LOAD_USER';

export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    case LOGOUT:
      cookie.remove('token');

      return Object.assign({}, state, {
        token: null,
        user: null,
        error: null
      });
    case LOGIN:
      return Object.assign({}, state, {
        token: null,
        user: null,
        error: null
      });
    case resolve(LOGIN):
      cookie.save('token', action.payload.data.token);

      return Object.assign({}, state, {
        token: action.payload.data.token,
        user: null,
        error: null
      });
    case reject(LOGIN):
      return Object.assign({}, state, {
        token: null,
        user: null,
        error: action.payload.data
      });
    case LOAD_USER:
      return Object.assign({}, state, {
        user: null,
        error: null
      });
    case resolve(LOAD_USER):
      return Object.assign({}, state, {
        user: action.payload.data,
        error: null
      });
    case reject(LOAD_USER):
      return Object.assign({}, state, {
        user: null,
        error: action.payload.data
      });
    default:
      return state;
  }
}

export function getToken(globalState) {
  return globalState.auth.token;
}

export function isAuthenticated(globalState) {
  return globalState.auth && globalState.auth.token;
}

export function loadUser() {
  return {
    type: LOAD_USER,
    payload: {
      promise: client => client.get('/api/users/me')
    }
  }
}

export function login({email, password}) {
  const action = {
    type: LOGIN,
    payload: {
      promise: client => client.post('/auth/local', {email, password})
    }
  };

  return dispatch => dispatch(action).then(() => dispatch(push('/')));
}

export function logout() {
  const action = {
    type: LOGOUT
  };

  return dispatch => {
    dispatch(action);
    dispatch(push('/login'));
  };
}