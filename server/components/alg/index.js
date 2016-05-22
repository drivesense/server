import 'dotenv/config';
import moment from 'moment';
import User from '../../api/user/user.model';
import {getLessons as greedy} from './greedy';
import {getLessons as brute} from './brute';
import {getLessons as naive} from './naive';
import {print} from './util/measure';

export function test() {
  return User.findOne({'name.first': 'Amos'})
    .then(amos => {
      return Promise.all([naive(moment(), amos), brute(moment(), amos), greedy(moment(), amos)]);
    })
    .then(([naive, brute, greedy]) => {
      print('naive', naive);
      print('brute', brute);
      print('greedy', greedy);
    });
}

export function getLessons(date, teacher) {
  return greedy(date, teacher);
}