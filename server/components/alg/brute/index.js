import {getMatches} from '../util/match';
import moment from 'moment';
import _ from 'lodash';
import User from '../../../api/user/user.model';

export function getBestTree(date, lessons, students, teacher) {
  if (students.length < 2) {
    return lessons;
  }

  const allCombos = getMatches(date, students, teacher).map(combo => {
    return getBestTree(moment(date).add(combo.lesson.duration + 15, 'minutes'), _.clone(lessons).concat([combo]), _.without(students, ...combo.lesson.getStudents()), teacher);
  }).map(combo => ({combo, mean: _.meanBy(combo, 'grade')}));

  return _.maxBy(allCombos, 'mean').combo;
}

export function getLessons(date, teacher) {
  const day = date.startOf('day');
  let minutes = 8 * 60;

  return User.find({type: 'student'})
    .then(students => {
      return getBestTree(moment(day).add(minutes, 'minutes'), [], students, teacher);
    })
    .then(results => _.map(results, 'lesson'));
}