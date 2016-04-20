import {resolve, reject} from 'redux-simple-promise';
const LOAD_LESSONS = 'agenda/LOAD_LESSONS';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_LESSONS:
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        error: null,
        lessons: null
      });
    case resolve(LOAD_LESSONS):
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        error: null,
        lessons: action.payload.data
      });
    case reject(LOAD_LESSONS):
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: action.payload.data,
        lessons: null
      });
    default:
      return state;
  }
}

export function loadLessons() {
  return {
    type: LOAD_LESSONS,
    payload: {
      promise: client => client.get('/api/lessons')
    }
  };
}
