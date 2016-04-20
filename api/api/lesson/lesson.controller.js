'use strict';

import Lesson from './lesson.model';
import createError from 'http-errors';

const errorIfEmpty = result => result || Promise.reject(createError(404));

export function index (req) {
  return Lesson.find({$or: [{student: req.user._id}, {teacher: req.user._id}]})
    .populate('student teacher');
}

export function create (req) {
  return new Lesson(req.body).save()
    .then(errorIfEmpty);
}
