import moment from 'moment';
import _ from 'lodash';
import combinatorics from 'js-combinatorics';

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