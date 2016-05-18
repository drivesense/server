import User from '../user/user.model';
import Topic from '../topic/topic.model';
import _ from 'lodash';
import moment from 'moment';

export default {
  dependencies: [User, Topic],
  seed: ([,, amos, omri, noam, hodaya, tomer, ayala, nessi, ziv, sean, alon], [squares, highway, bumpers]) => [{
    teacher: amos._id,
    participants: [{
      student: ayala._id,
      progress: [{
        topic: highway,
        grade: 2
      }, {
        topic: squares,
        grade: 2
      }]
    }, {
      student: hodaya._id,
      progress: [{
        topic: highway,
        grade: 2
      }]
    }],
    date: moment().startOf('day').subtract(1, 'days').add(10, 'hours').add(0, 'minutes'),
    duration: 90
  }, {
    teacher: amos._id,
    participants: [{
      student: tomer._id,
      progress: [{
        topic: highway,
        grade: 2
      }]
    }, {
      student: ziv._id,
      progress: [{
        topic: squares,
        grade: 2
      }]
    }],
    date: moment().startOf('day').subtract(1, 'days').add(11, 'hours').add(45, 'minutes'),
    duration: 45
  }, {
    teacher: amos._id,
    participants: [{
      student: nessi._id,
      progress: [{
        topic: squares,
        grade: 1
      }]
    }, {
      student: noam._id,
      progress: [{
        topic: squares,
        grade: 1
      }]
    }],
    date: moment().startOf('day').subtract(1, 'days').add(12, 'hours').add(45, 'minutes'),
    duration: 60
  }, {
    teacher: amos._id,
    participants: [{
      student: sean._id,
      progress: [{
        topic: highway,
        grade: 1
      }]
    }],
    date: moment().startOf('day').subtract(1, 'days').add(14, 'hours').add(0, 'minutes'),
    duration: 90
  }]
};