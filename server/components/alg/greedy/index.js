import _ from 'lodash';
import {getMatches} from '../util/match';
import {iterateDay} from '../util/iterate';

const getCombo = (date, students, teacher) => {
  const combs = getMatches(date, students, teacher);

  if (!combs.length) {
    return null;
  }

  return _.maxBy(combs, 'grade');
};

export function getLessons(date, teacher) {
  return iterateDay(date, teacher, getCombo);
}