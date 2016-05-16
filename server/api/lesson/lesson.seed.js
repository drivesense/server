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
      }]
    }, {
      student: hodaya._id,
      progress: [{
        topic: bumpers,
        grade: 2
      }]
    }],
    date: moment().startOf('day').subtract(1, 'days').add(16, 'hours'),
    duration: 90
  }]
};