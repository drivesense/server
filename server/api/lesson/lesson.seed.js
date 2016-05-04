import User from '../user/user.model';
import Topic from '../topic/topic.model';
import _ from 'lodash';
import moment from 'moment';

export default {
  dependencies: [User, Topic],
  seed: (users, topics) => _.flatten(_.times(2, j => {
    return _.flatten(_.times(3, s => {
      return _.times(30, i => ({
        comment: 'This is a comments used to describe more about the lesson itself.\nIt can also be multiple lines',
        student: users[users.length - 1 - (j * 4 + s)],
        teacher: users[users.length - ((j + 1) * 4)],
        date: moment().startOf('day').add((i % 3), 'days').add(((i + s) % 14) + 6, 'hours').add((5 % 3) * 15, 'minutes'),
        duration: 45 + (i % 4) * 15,
        progress: [{
          topic: topics[i % 2],
          grade: i % 10 + 1
        }]
      }));
    }));
  }))
};