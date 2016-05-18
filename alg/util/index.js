import User from '../../server/api/user/user.model';
import moment from 'moment';
import _ from 'lodash';
import {getCoupleDuration, combination} from './match';
import {grade} from './grade';

const getLesson = (date, students) => {
  const combs = _(combination(students, 2))
    .map(couple => ({couple, duration: getCoupleDuration(date, ...couple)}))
    .filter(({duration}) => duration !== -1)
    .map(({couple, duration}) => ({
      date: date.format(),
      students: couple,
      grade: grade(...couple),
      duration
    })).value();

  if (!combs.length) {
    return null;
  }

  return _.maxBy(combs, 'grade');
};

export function getMatches(day) {
  let minutes = 8 * 60;
  day = day.startOf('day');

  return User.find({type: 'student'})
    .then(students => {
      const lessons = [];

      while (students.length > 1) {
        const lesson = getLesson(moment(day).add(minutes, 'minutes'), students);

        if (!lesson) {
          break;
        }

        lessons.push(lesson);
        minutes += lesson.duration + 15;
        students = _.without(students, ...lesson.students);
      }

      return lessons.map(lesson => {
        lesson.students = lesson.students.map(stu => stu.name.first);

        return lesson;
      });
    });
}