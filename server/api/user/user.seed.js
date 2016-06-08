import School from '../school/school.model';
import _ from 'lodash';
import moment from 'moment';
import catNames from 'cat-names';

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
  }]
    .concat(_.times(28, i => {
      const minX = 31.782950;
      const maxX = 31.791545;
      const minY = 34.684182;
      const maxY = 34.722614;

      return {
        name: {
          first: catNames.random(),
          last: 'Cat'
        },
        email: `${i}@gmail.com`,
        password: '12345678',
        type: 'student',
        school: schools[0],
        constraints: [{
          start: moment().startOf('day').add(8, 'hours'),
          end: moment().startOf('day').add(20, 'hours'),
          duration: 45
        }],
        location: [Math.random() * (maxX - minX) + minX, Math.random() * (maxY - minY) + minY]
      }
    }))
};