import _ from 'lodash';
import {getMatches} from '../util/match';
import {iterateDay} from '../util/iterate';

const getCombo = (date, students, teacher, normalize, factor = 0) => {
  const combs = getMatches(date, students, teacher, normalize);

  if (!combs.length) {
    return null;
  }

  if (Math.random() < factor) {
    const combos = _.sortBy(combs, 'grade');

    return _.takeRight(combos, 2)[0];
  }

  return _.maxBy(combs, 'grade');
};

export function getLessons(date, teacher, factor) {
  return iterateDay(date, teacher, getCombo, factor);
}