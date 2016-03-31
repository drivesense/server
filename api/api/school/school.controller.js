'use strict';

import School from './school.model';
import createError from 'http-errors';
import _ from 'lodash';

const errorIfEmpty = result => result || Promise.reject(createError(404));

export function index () {
  return School.find({});
}

export function create (req) {
  return new School(req.body).save()
    .then(errorIfEmpty);
}

export function update (req) {
  const data = _.pick(req.body, ['name', 'location', 'logo']);

  return School.findById(req.params.id)
    .then(errorIfEmpty)
    .then(school => school.set(data).save())
    .then(_.noop);
}
