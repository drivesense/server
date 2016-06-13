import Lesson from './lesson.model';
import createError from 'http-errors';
import _ from 'lodash';

const errorIfEmpty = result => result || Promise.reject(createError(404));

export function index(req) {
  return Lesson.find({$or: [{'participants.student': req.user._id}, {teacher: req.user._id}]})
    .sort('date')
    .populate('teacher participants.student participants.progress.topic');
}

export function update (req) {
  const data = _.pick(req.body, ['participants']);

  return Lesson.findById(req.params.id)
    .then(errorIfEmpty)
    .then(lesson => lesson.set(data).save())
    .then(_.noop);
}

export function schedule(req) {
  return Promise.all(req.body.lessons.map(lesson => {
    const newLesson = _.pick(lesson, ['date', 'duration', 'comment', 'participants']);

    newLesson.teacher = req.user._id;

    return new Lesson(newLesson).save()
      .then(errorIfEmpty)
      .then(lesson => Lesson.populate(lesson, {path: 'teacher participants.student participants.progress.topic'}));
  }));
}