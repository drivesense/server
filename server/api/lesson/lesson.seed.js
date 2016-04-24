'use strict';

import User from '../user/user.model';
import _ from 'lodash';

export default {
  dependencies: [User],
  seed: users => _.flatten(_.times(2, j => {
    return _.flatten(_.times(3, s => {
      return _.times(10, i => ({
        student: users[users.length - 1 - (j * 4 + s)],
        teacher: users[users.length - ((j + 1) * 4)],
        date: Date.now() + i * (3 + s) * 1000 * 60 * 60 * 24
      }))
    }));
  }))
};