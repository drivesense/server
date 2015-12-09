'use strict';

import User from '../../api/user/user.model';

export default roles => User.remove({})
  .exec()
  .then(() => User.create([{
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
  }]));