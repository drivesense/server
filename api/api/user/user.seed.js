'use strict';

export default {
  seed: () => [{
    name: {
      first: 'Noam',
      last: 'Okman'
    },
    email: 'noamokman@gmail.com',
    password: '1',
    type: 'admin'
  }, {
    name: {
      first: 'Omri',
      last: 'Litov'
    },
    email: 'omrilitov@gmail.com',
    password: '1',
    type: 'admin'
  }, {
    name: {
      first: 'Elad',
      last: 'Bezalel'
    },
    email: 'elad.bezalel@gmail.com',
    password: '1',
    type: 'admin'
  }, {
    name: {
      first: '',
      last: 'nachos'
    },
    gender: 'male',
    email: 'nacho@gmail.com',
    password: 'nacho',
    type: 'teacher'
  }]
};