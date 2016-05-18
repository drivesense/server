import _ from 'lodash';
import {getCoupleDuration, combination} from '../util/match';
import {grade} from '../util/grade';
import {iterateDay} from '../util/iterate';

const getLesson = (date, students) => {
  const combs = _(combination(students, 2))
    .map(couple => ({couple, duration: getCoupleDuration(date, ...couple)}))
    .filter(({duration}) => duration !== -1)
    .map(({couple, duration}) => ({
      date: date.format(),
      students: couple,
      grade: grade(...couple),
      duration
    })).value();

  if (!combs.length) {
    return null;
  }

  return _.maxBy(combs, 'grade');
};

export function getLessons(day) {
  return iterateDay(day, getLesson);
}