import moment from 'moment';
import _ from 'lodash';
import combinatorics from 'js-combinatorics';
import {grade} from './grade';
import Lesson from '../../../api/lesson/lesson.model';

export function combination(students) {
  const cmb = combinatorics.combination(students, 2);
  const arr = [];
  let stu;

  while (stu = cmb.next()) {
    arr.push(stu);
  }

  return arr;
}

export function getDuration(date, student) {
  return (_.find(student.constraints || [], constraint => {
    return moment(constraint.start).isSameOrBefore(moment(date)) &&
      moment(constraint.end).isSameOrAfter(moment(date).add(constraint.duration, 'minutes'));
  }) || {duration: -1}).duration;
}

export function getCoupleDuration(date, student1, student2) {
  const dur1 = getDuration(date, student1);
  const dur2 = getDuration(date, student2);

  return dur1 === dur2 && dur2 !== -1 ? dur1 : -1;
}

export function getMatches(date, students, teacher) {
  return _(combination(students, 2))
    .map(couple => ({couple, duration: getCoupleDuration(date, ...couple)}))
    .filter(({duration}) => duration !== -1)
    .map(({couple, duration}) => ({
      lesson: new Lesson({
        participants: couple.map(stu => ({student: stu, progress: []})),
        date,
        teacher,
        duration
      }),
      grade: grade(...couple)
    })).value();
}