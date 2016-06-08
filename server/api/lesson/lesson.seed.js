import User from '../user/user.model';
import Topic from '../topic/topic.model';
import moment from 'moment';
import _ from 'lodash';

const prog = (stu, topics) => ({
  student: stu,
  progress: [{
    topic: _.sample(topics),
    grade: Math.ceil(Math.random() * 10)
  }, {
    topic: _.sample(topics),
    grade: Math.ceil(Math.random() * 10)
  }]
});

export default {
  dependencies: [User, Topic],
  seed: ([,, amos, ...students], topics) => _.times(Math.ceil(students.length / 2.0), i => ({
    teacher: amos._id,
    participants: [
      prog(students[i], topics),
      prog(students[i + Math.floor(students.length / 2)], topics)
    ],
    date: moment().startOf('day').subtract(10, 'days').add(8, 'hours').add(i * 45, 'minutes'),
    duration: 45
  }))
};