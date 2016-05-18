import _ from 'lodash';
import User from '../user/user.model';
import Lesson from '../lesson/lesson.model';
import createError from 'http-errors';

// Get list of users
export function index (req) {
  return User.find({type: 'student', school: req.user.school});
}

// Get list of users
export function topics (req) {
  if (req.user.type !== 'teacher' && req.user._id.equals(req.params.id)) {
    return Promise.reject(createError(403));
  }
  return Lesson.find({'participants.student': req.params.id})
    .sort('-date')
    .populate('participants.progress.topic')
    .then(lessons => {
      return _.reduce(lessons, (total, lesson) => {
        const participant = _.find(lesson.participants, p => p.student.equals(req.params.id));

        if(!participant) {
          return total;
        }

        participant.progress.forEach(p => {
          const id = p.topic._id.toString();

          total[id] = total[id] || {
            topic: p.topic,
            grade: p.grade,
            date: lesson.date
          };
        });

        return total;
      }, {});
    })
    .then(total => _.values(total));
}
