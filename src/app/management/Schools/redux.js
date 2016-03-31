import {resolve, reject} from 'redux-simple-promise';
const LOAD_SCHOOLS = 'management/LOAD_SCHOOLS';
const ADD_SCHOOL = 'management/ADD_SCHOOL';
const UPDATE_SCHOOL = 'management/UPDATE_SCHOOL';
const EDIT_SCHOOL = 'management/EDIT_SCHOOL';
const DISMISS_EDIT_SCHOOL = 'management/DISMISS_EDIT_SCHOOL';

const initialState = {
  loaded: false,
  edit: {
    isOpen: false
  }
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
    case EDIT_SCHOOL:
      return Object.assign({}, state, {
        edit: {
          isOpen: true,
          school: action.payload.school
        }
      });
    case DISMISS_EDIT_SCHOOL:
      return Object.assign({}, state, {
        edit: {
          isOpen: false,
          school: null
        }
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

export function update(id, school) {
  return {
    type: UPDATE_SCHOOL,
    payload: {
      promise: client => client.put(`/api/schools/${id}`, school)
    }
  }
}

export function editSchool(school) {
  return {
    type: EDIT_SCHOOL,
    payload: {
      school
    }
  }
}

export function dismissEdit() {
  return {
    type: DISMISS_EDIT_SCHOOL
  }
}

export function saveEdit(school) {
  return dispatch => dispatch(update(school._id, school)).then(() => dispatch(dismissEdit()));
}
