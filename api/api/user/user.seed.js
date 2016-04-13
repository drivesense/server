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
      first: 'Moti',
      last: 'Luchim'
    },
    email: 'moti@d.com',
    password: '1',
    type: 'teacher',
    data: {
      isManager: true
    }
  }, {
    name: {
      first: 'Buck',
      last: 'leup'
    },
    email: 'buck@d.com',
    password: '1',
    type: 'student'
  }]
};