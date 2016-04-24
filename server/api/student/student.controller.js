'use strict';

import User from '../user/user.model';

// Get list of users
export function index(req) {
  return User.find({type: 'student', school: req.user.school});
}
