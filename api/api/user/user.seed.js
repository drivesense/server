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
    email: 'manager@d.com',
    password: '1',
    type: 'teacher',
    manager: true,
    school: schools[0]
  }, {
    name: {
      first: 'First',
      last: 'Gear'
    },
    email: 'teacher@d.com',
    password: '1',
    type: 'teacher',
    school: schools[0]
  }, {
    name: {
      first: 'Second',
      last: 'Gear'
    },
    email: 'student@d.com',
    password: '1',
    type: 'student',
    school: schools[0]
  }]
};