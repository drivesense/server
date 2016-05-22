import _ from 'lodash';
import {getMatches} from '../util/match';
import {iterateDay} from '../util/iterate';

const getCombo = (date, students, teacher, normalize) => {
  const combs = getMatches(date, students, teacher, normalize);

  if (!combs.length) {
    return null;
  }

  return _.maxBy(combs, 'grade');
};

export function getLessons(date, teacher) {
  return iterateDay(date, teacher, getCombo);
}