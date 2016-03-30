'use strict';

export default {
  seed: () => [{
    name: {
      first: 'burrito',
      last: 'man'
    },
    email: 'burrito@gmail.com',
    password: 'burrito',
    type: 'admin'
  }, {
    name: {
      first: 'nacho',
      last: 'nachos'
    },
    gender: 'male',
    email: 'nacho@gmail.com',
    password: 'nacho',
    type: 'admin'
  }]
};