'use strict';

import User from '../user/user.model';

// Get list of users
export function index() {
  return User.find({type: 'teacher', data: {isManager: true}});
}
