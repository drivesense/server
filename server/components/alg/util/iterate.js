import moment from 'moment';
import _ from 'lodash';
import User from '../../../api/user/user.model';

export function iterateDay(date, teacher, getCombo) {
  const day = date.startOf('day');
  let minutes = 8 * 60;

  return User.find({type: 'student'})
    .then(students => {
      const combos = [];

      while (students.length > 1) {
        const combo = getCombo(moment(day).add(minutes, 'minutes'), students, teacher);

        if (!combo) {
          break;
        }

        combos.push(combo);
        minutes += combo.lesson.duration + 15;
        students = _.without(students, ...combo.lesson.getStudents());
      }

      return _.map(combos, 'lesson');
    });
}