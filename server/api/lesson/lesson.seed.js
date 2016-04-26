'use strict';

import User from '../user/user.model';
import Topic from '../topic/topic.model';
import _ from 'lodash';

export default {
  dependencies: [User, Topic],
  seed: (users, topics) => _.flatten(_.times(2, j => {
    return _.flatten(_.times(3, s => {
      return _.times(10, i => ({
        comment: 'This is a comments used to describe more about the lesson itself.\nIt can also be multiple lines',
        student: users[users.length - 1 - (j * 4 + s)],
        teacher: users[users.length - ((j + 1) * 4)],
        date: Date.now() + i * (3 + s) * 1000 * 60 * 60 * 24,
        duration: 30 + (i % 3) * 15,
        progress: [{
          topic: topics[i % 2],
          grade: i + 1
        }]
      }));
    }));
  }))
};