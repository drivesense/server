import moment from 'moment';
import _ from 'lodash';
import User from '../../server/api/user/user.model';

export function iterateDay(day, cb) {
  let minutes = 8 * 60;
  day = day.startOf('day');

  return User.find({type: 'student'})
    .then(students => {
      const lessons = [];

      while (students.length > 1) {
        const lesson = cb(moment(day).add(minutes, 'minutes'), students);

        if (!lesson) {
          break;
        }

        lessons.push(lesson);
        minutes += lesson.duration + 15;
        students = _.without(students, ...lesson.students);
      }

      return lessons;
    });
}