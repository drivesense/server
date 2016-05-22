import 'dotenv/config';
import moment from 'moment';
import User from '../../api/user/user.model';
import {getLessons as greedy} from './greedy';
import {getLessons as brute} from './brute';
import {getLessons as naive} from './naive';
import {print} from './util/measure';
import {createNormalize} from './util/normalize';

export function test() {
  return User.findOne({'name.first': 'Amos'})
    .then(amos => {
      return createNormalize(moment(), amos)
        .then(normalize => {
          return Promise.all([naive(moment(), amos), brute(moment(), amos), greedy(moment(), amos)])
            .then(([naive, brute, greedy]) => {
              print('naive', naive, normalize);
              print('brute', brute, normalize);
              print('greedy', greedy, normalize);
            });
        });
    });
}

export function getLessons(date, teacher) {
  return greedy(date, teacher);
}