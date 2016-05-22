import {getMatches} from '../util/match';
import {getStudents} from '../util/source';
import {createNormalize} from '../util/normalize';
import moment from 'moment';
import _ from 'lodash';

export function getBestTree(date, lessons, students, teacher, normalize) {
  if (students.length < 2) {
    return lessons;
  }

  const allCombos = getMatches(date, students, teacher, normalize).map(combo => {
    return getBestTree(moment(date).add(combo.lesson.duration + 15, 'minutes'), _.clone(lessons).concat([combo]), _.without(students, ...combo.lesson.getStudents()), teacher, normalize);
  }).map(combo => ({combo, mean: _.meanBy(combo, 'grade')}));

  return _.maxBy(allCombos, 'mean').combo;
}

export function getLessons(date, teacher) {
  const day = date.startOf('day');
  let minutes = 8 * 60;

  return createNormalize(date, teacher)
    .then(normalize => {
      return getStudents(teacher)
        .then(students => {
          return getBestTree(moment(day).add(minutes, 'minutes'), [], students, teacher, normalize);
        })
        .then(results => _.map(results, 'lesson'));
    });
}