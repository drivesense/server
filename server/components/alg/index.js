import 'dotenv/config';
import moment from 'moment';
import User from '../../api/user/user.model';
import {getLessons as greedy} from './greedy';
import {getLessons as brute} from './brute';
import {getLessons as naive} from './naive';
import {measure} from './util/measure';
import {createNormalize} from './util/normalize';

export function test() {
  return User.findOne({'name.first': 'Amos'})
    .then(amos => {
      return createNormalize(moment(), amos)
        .then(normalize => {
          return measure('naive', () => naive(moment(), amos), normalize)
            .then(() => measure('brute', () => brute(moment(), amos), normalize))
            .then(() => measure('greedy', () => greedy(moment(), amos), normalize))
            .then(() => console.log('done'));
        });
    });
}

export function getLessons(date, teacher) {
  return greedy(date, teacher);
}