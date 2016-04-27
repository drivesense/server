'use strict';

import Lesson from './lesson.model';
import createError from 'http-errors';
import _ from 'lodash';

const errorIfEmpty = result => result || Promise.reject(createError(404));

export function index (req) {
  return Lesson.find({$or: [{student: req.user._id}, {teacher: req.user._id}]})
    .sort('date')
    .populate('student teacher');
}

export function create (req) {
  const reqLesson = req.body;

  return Promise.all(reqLesson.students.map(function (student) {
    const lesson = _.pick(reqLesson, ['date', 'duration', 'comment']);

    lesson.teacher = req.user._id;
    lesson.student = student._id;

    return new Lesson(lesson).save()
      .then(errorIfEmpty);
  }));
}
