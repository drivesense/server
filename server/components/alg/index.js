import 'dotenv/config';
import moment from 'moment';
import User from '../../api/user/user.model';
import {getLessons as greedy} from './greedy';
import {getLessons as brute} from './brute';
import {getLessons as naive} from './naive';
import {measure} from './util/measure';
import {createNormalize} from './util/normalize';

const promiseReq = (promise, times) => {
  if (times === 1) {
    return promise();
  }

  return promise()
    .then(() => promiseReq(promise, times - 1));
};

export function test() {
  return User.findOne({'name.first': 'Amos'})
    .then(amos => {
      return createNormalize(moment(), amos)
        .then(normalize => {
          return measure('greedy (no random)', () => greedy(moment(), amos), normalize)
          //promiseReq(() => measure('greedy', () => greedy(moment(), amos, 0.3), normalize), 30)
            .then(() => measure('brute', () => brute(moment(), amos), normalize))
            //.then(() => measure('greedy (no random)', () => greedy(moment(), amos), normalize))
            .then(() => measure('naive', () => naive(moment(), amos), normalize))
            .then(() => console.log('done'));
        });
    });
}

export function getLessons(date, teacher) {
  return greedy(date, teacher);
}