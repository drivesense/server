import Lesson from './lesson.model';
import createError from 'http-errors';
import _ from 'lodash';

const errorIfEmpty = result => result || Promise.reject(createError(404));

export function index (req) {
  return Lesson.find({$or: [{'participants.student': req.user._id}, {teacher: req.user._id}]})
    .sort('date')
    .populate('teacher participants.student participants.progress.topic');
}

export function create (req) {
  const lesson = _.pick(req.body, ['date', 'duration', 'comment', 'student']);

  lesson.teacher = req.user._id;

  return new Lesson(lesson).save()
    .then(errorIfEmpty)
    .then(lesson => Lesson.populate(lesson, {path: 'student'}));
}
