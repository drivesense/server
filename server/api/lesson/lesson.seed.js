import User from '../user/user.model';
import Topic from '../topic/topic.model';
import moment from 'moment';
import _ from 'lodash';

const prog = (stu, topics) => {
  var firstTopic = _.sample(topics);
  return {
    student: stu,
    progress: [{
      topic: firstTopic,
      grade: Math.ceil(Math.random() * 10)
    }, {
      topic: _.sample(_.without(topics, firstTopic)),
      grade: Math.ceil(Math.random() * 10)
    }]
  }
};

export default {
  dependencies: [User, Topic],
  seed: ([,, amos, ...students], topics) => _.times(Math.ceil(students.length / 2.0), i => ({
    teacher: amos._id,
    participants: [
      prog(students[i], topics),
      prog(students[i + Math.floor(students.length / 2)], topics)
    ],
    date: moment().startOf('day').subtract(students.length > 30 ? 10 : 1, 'days').add(8, 'hours').add(i * 60, 'minutes'),
    duration: 45
  }))
};