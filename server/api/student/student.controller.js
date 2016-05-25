import _ from 'lodash';
import User from '../user/user.model';
import Lesson from '../lesson/lesson.model';
import createError from 'http-errors';

// Get list of users
export function index(req) {
  return User.find({type: 'student', school: req.user.school});
}

export function constraints({user, body: {constraint}}) {
  user.constraints.push(constraint);
  user.markModified('constraints');

  return user.save()
    .then(_.noop);
}

export function topics(req) {
  if (req.user.type !== 'teacher' && req.user._id.equals(req.params.id)) {
    return Promise.reject(createError(403));
  }

  return Lesson.getProgress(req.params.id)
    .then(_.values);
}
