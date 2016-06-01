import School from '../school/school.model';
import moment from 'moment';

export default {
  dependencies: [School],
  seed: schools => [{
    name: {
      first: 'admin',
      last: 'admin'
    },
    email: 'admin@gmail.com',
    password: '12345678',
    type: 'admin'
  }, {
    name: {
      first: 'Moti',
      last: 'Luchim'
    },
    email: 'moti@gmail.com',
    password: '12345678',
    school: schools[0],
    type: 'teacher',
    manager: true
  }, {
    name: {
      first: 'Amos',
      last: 'Zigdon'
    },
    email: 'amos@gmail.com',
    password: '12345678',
    school: schools[0],
    type: 'teacher'
  }, {
    name: {
      first: 'Omri',
      last: 'Litov'
    },
    email: 'omrilitov@gmail.com',
    password: '12345678',
    type: 'student',
    school: schools[0],
    constraints: [{
      start: moment().startOf('day').add(8, 'hours'),
      end: moment().startOf('day').add(20, 'hours'),
      duration: 45
    }],
    location: [31.77673825, 34.70854104]
  }, {
    name: {
      first: 'Noam',
      last: 'Okman'
    },
    email: 'noamokman@gmail.com',
    password: '12345678',
    type: 'student',
    school: schools[0],
    constraints: [{
      start: moment().startOf('day').add(8, 'hours'),
      end: moment().startOf('day').add(20, 'hours'),
      duration: 45
    }],
    location: [31.78128934, 34.69164312]
  }, {
    name: {
      first: 'Hodaya',
      last: 'Magidi'
    },
    email: 'hodaya@gmail.com',
    password: '12345678',
    type: 'student',
    school: schools[0],
    constraints: [{
      start: moment().startOf('day').add(8, 'hours'),
      end: moment().startOf('day').add(20, 'hours'),
      duration: 45
    }],
    location: [31.782594, 34.703531]
  }, {
    name: {
      first: 'Tomer',
      last: 'Cohen'
    },
    email: 'tomer@gmail.com',
    password: '12345678',
    type: 'student',
    school: schools[0],
    constraints: [{
      start: moment().startOf('day').add(8, 'hours'),
      end: moment().startOf('day').add(20, 'hours'),
      duration: 45
    }],
    location: [31.783914, 34.693508]
  }, {
    name: {
      first: 'Ayala',
      last: 'Friesm'
    },
    email: 'ayala@gmail.com',
    password: '12345678',
    type: 'student',
    school: schools[0],
    constraints: [{
      start: moment().startOf('day').add(8, 'hours'),
      end: moment().startOf('day').add(20, 'hours'),
      duration: 45
    }],
    location: [31.781551, 34.695192]
  }, {
    name: {
      first: 'Nessi',
      last: 'Larros'
    },
    email: 'nessi@gmail.com',
    password: '12345678',
    type: 'student',
    school: schools[0],
    constraints: [{
      start: moment().startOf('day').add(8, 'hours'),
      end: moment().startOf('day').add(20, 'hours'),
      duration: 45
    }],
    location: [31.784665, 34.693859]
  }, {
    name: {
      first: 'Ziv',
      last: 'Rom'
    },
    email: 'ziv@gmail.com',
    password: '12345678',
    type: 'student',
    school: schools[0],
    constraints: [{
      start: moment().startOf('day').add(8, 'hours'),
      end: moment().startOf('day').add(20, 'hours'),
      duration: 45
    }],
    location: [31.784606, 34.692626]
  }, {
    name: {
      first: 'Sean',
      last: 'Barzilay'
    },
    email: 'sean@gmail.com',
    password: '12345678',
    type: 'student',
    school: schools[0],
    constraints: [{
      start: moment().startOf('day').add(8, 'hours'),
      end: moment().startOf('day').add(20, 'hours'),
      duration: 45
    }],
    location: [31.783008, 34.692726]
  }]
};