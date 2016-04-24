'use strict';

import School from '../school/school.model';

export default {
  dependencies: [School],
  seed: schools => [{
    name: {
      first: 'Noam',
      last: 'Okman'
    },
    email: 'noamokman@gmail.com',
    password: '12345678',
    type: 'admin'
  }, {
    name: {
      first: 'Omri',
      last: 'Litov'
    },
    email: 'omrilitov@gmail.com',
    password: '12345678',
    type: 'admin'
  }, {
    name: {
      first: 'Elad',
      last: 'Bezalel'
    },
    email: 'elad.bezalel@gmail.com',
    password: '12345678',
    type: 'admin'
  }, {
    name: {
      first: 'Moti',
      last: 'Luchim'
    },
    email: 'manager@d.com',
    password: '12345678',
    type: 'teacher',
    manager: true,
    school: schools[0]
  }, {
    name: {
      first: 'Brock',
      last: 'Rock'
    },
    email: 'teacher1@d.com',
    password: '12345678',
    type: 'teacher',
    school: schools[0]
  }, {
    name: {
      first: 'Ash',
      last: 'Ketchum'
    },
    email: 'student11@d.com',
    password: '12345678',
    type: 'student',
    school: schools[0]
  }, {
    name: {
      first: 'Yogi',
      last: 'Ho'
    },
    email: 'student12@d.com',
    password: '12345678',
    type: 'student',
    school: schools[0]
  }, {
    name: {
      first: 'Naruto',
      last: 'Ninja'
    },
    email: 'student13@d.com',
    password: '12345678',
    type: 'student',
    school: schools[0]
  }, {
    name: {
      first: 'Misty',
      last: 'Water'
    },
    email: 'teacher2@d.com',
    password: '12345678',
    type: 'teacher',
    school: schools[0]
  }, {
    name: {
      first: 'Mister',
      last: 'Nobody'
    },
    email: 'student21@d.com',
    password: '12345678',
    type: 'student',
    school: schools[0]
  }, {
    name: {
      first: 'Mister',
      last: 'Anderson'
    },
    email: 'student22@d.com',
    password: '12345678',
    type: 'student',
    school: schools[0]
  }, {
    name: {
      first: 'Lord',
      last: 'Voldemort'
    },
    email: 'student23@d.com',
    password: '12345678',
    type: 'student',
    school: schools[0]
  }]
};