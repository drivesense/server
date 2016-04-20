'use strict';

import User from '../user/user.model';
import _ from 'lodash';

export default {
  dependencies: [User],
  seed: users => _.times(10, i => ({
    student: users[5],
    teacher: users[4],
    date: Date.now() + i * 3 * 1000 * 60 * 60 * 24
  }))
};