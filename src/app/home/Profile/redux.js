import {resolve, reject} from 'redux-simple-promise';
const LOAD_MANAGERS = 'management/LOAD_MANAGERS';
const ADD_MANAGER = 'management/ADD_MANAGER';
const REMOVE_MANAGER = 'management/REMOVE_MANAGER';
const UPDATE_MANAGER = 'management/UPDATE_MANAGER';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_MANAGERS:
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        error: null,
        managers: null
      });
    case resolve(LOAD_MANAGERS):
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        error: null,
        managers: action.payload.data
      });
    case reject(LOAD_MANAGERS):
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: action.payload.data,
        managers: null
      });
    default:
      return state;
  }
}

export function load() {
  return {
    type: LOAD_MANAGERS,
    payload: {
      promise: client => client.get('/api/managers')
    }
  };
}

export function create(data) {
  return {
    type: ADD_MANAGER,
    payload: {
      promise: client => client.post('/api/managers', data)
    }
  }
}

export function update(id, data) {
  return {
    type: UPDATE_MANAGER,
    payload: {
      promise: client => client.put(`/api/managers/${id}`, data)
    }
  }
}

export function remove(id) {
  return {
    type: REMOVE_MANAGER,
    payload: {
      promise: client => client.delete(`/api/managers/${id}`)
    }
  }
}
