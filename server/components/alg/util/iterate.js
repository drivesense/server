import moment from 'moment';
import _ from 'lodash';
import {getStudents} from './source';
import {createNormalize} from './normalize';

export function iterateDay(date, teacher, getCombo) {
  const day = date.startOf('day');
  let minutes = 8 * 60;

  return createNormalize(date, teacher)
    .then(normalize => {
      return getStudents(teacher)
        .then(students => {
          const combos = [];

          while (students.length > 1) {
            const combo = getCombo(moment(day).add(minutes, 'minutes'), students, teacher, normalize);

            if (!combo) {
              break;
            }

            combos.push(combo);
            minutes += combo.lesson.duration + 15;
            students = _.without(students, ...combo.lesson.getStudents());
          }

          return _.map(combos, 'lesson');
        });
    })
}