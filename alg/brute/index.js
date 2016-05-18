import {getCoupleDuration, combination} from '../util/match';
import {grade} from '../util/grade';
import moment from 'moment';
import _ from 'lodash';
import User from '../../server/api/user/user.model';

const getCombs = (date, students) => {
  return _(combination(students, 2))
    .map(couple => ({couple, duration: getCoupleDuration(date, ...couple)}))
    .filter(({duration}) => duration !== -1)
    .map(({couple, duration}) => ({
      date: date.format(),
      students: couple,
      grade: grade(...couple),
      duration
    })).value();
};

export function getBestTree(date, lessons, students) {
  if (students.length < 2) {
    return lessons;
  }

  const allCombos = getCombs(date, students).map(lesson => {
    return getBestTree(moment(date).add(lesson.duration + 15, 'minutes'), _.clone(lessons).concat([lesson]), _.without(students, ...lesson.students));
  }).map(combo => ({combo, mean: _.meanBy(combo, 'grade')}));

  return _.maxBy(allCombos, 'mean').combo;
}

export function getLessons(day) {
  let minutes = 8 * 60;
  day = day.startOf('day');

  return User.find({type: 'student'})
    .then(students => {
      return getBestTree(moment(day).add(minutes, 'minutes'), [], students);
    })
}