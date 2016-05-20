import _ from 'lodash';
import {grade} from './grade';

export function print(name, lessons) {
  const combos = lessons.map(lesson => ({lesson, grade: grade(...lesson.getStudents())}));
  const mean = _.meanBy(combos, 'grade');

  console.log(`${name}: ${mean}`);
  combos.forEach(combo => {
    const students = combo.lesson.getStudents();
    const stu1 = students[0];
    const stu2 = students[1];

    console.log(`\t${combo.lesson.teacher.name.first}: ${stu1.name.first}, ${stu2.name.first} - ${combo.grade}`);
  });
}