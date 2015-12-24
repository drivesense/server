'use strict';

export default {
  model: 'User',
  dependencies: ['Role'],
  seed: roles => [{
    name: {
      first: 'burrito',
      last: 'man'
    },
    gender: 'male',
    email: 'burrito@gmail.com',
    roles: [
      roles[0]
    ],
    password: 'burrito'
  }, {
    name: {
      first: 'nacho',
      last: 'nachos'
    },
    gender: 'male',
    email: 'nacho@gmail.com',
    password: 'nacho'
  }]
};