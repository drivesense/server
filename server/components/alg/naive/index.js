import _ from 'lodash';
import {getMatches} from '../util/match';
import {iterateDay} from '../util/iterate';

const getCombo = (date, students, teacher) => {
  return _.head(getMatches(date, students, teacher)) || null;
};

export function getLessons(date, teacher) {
  return iterateDay(date, teacher, getCombo);
}