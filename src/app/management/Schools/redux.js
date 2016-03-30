import {resolve, reject} from 'redux-simple-promise';
const LOAD_SCHOOLS = 'management/LOAD_SCHOOLS';
const ADD_SCHOOL = 'management/ADD_SCHOOL';
const UPDATE_SCHOOL = 'management/UPDATE_SCHOOL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SCHOOLS:
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        error: null,
        schools: null
      });
    case resolve(LOAD_SCHOOLS):
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        error: null,
        schools: action.payload.data
      });
    case reject(LOAD_SCHOOLS):
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: action.payload.data,
        schools: null
      });
    default:
      return state;
  }
}

export function load() {
  return {
    type: LOAD_SCHOOLS,
    payload: {
      promise: client => client.get('/api/schools')
    }
  };
}

export function create(data) {
  return {
    type: ADD_SCHOOL,
    payload: {
      promise: client => client.post('/api/schools', data)
    }
  }
}

export function update(id, data) {
  return {
    type: UPDATE_SCHOOL,
    payload: {
      promise: client => client.put(`/api/schools/${id}`, data)
    }
  }
}
