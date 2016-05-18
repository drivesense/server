import _ from 'lodash';
import {getCoupleDuration, combination} from '../util/match';
import {iterateDay} from '../util/iterate';

const getLesson = (date, students) => {
  return _(combination(students, 2))
    .map(couple => ({couple, duration: getCoupleDuration(date, ...couple)}))
    .filter(({duration}) => duration !== -1)
    .map(({couple, duration}) => ({
      date: date.format(),
      students: couple,
      duration
    })).head() || null;
};

export function getLessons(day) {
  return iterateDay(day, getLesson);
}