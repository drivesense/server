import _ from 'lodash';
import {grade} from './grade';

export function print(name, lessons) {
  const grades = lessons.map(lesson => grade(...lesson.students));
  const mean = _.mean(grades);

  console.log(`${name}: ${mean}`);
  lessons.forEach(lesson => {
    const stu1 = lesson.students[0];
    const stu2 = lesson.students[1];
    const currGrade = grade(stu1, stu2);

    console.log(`\t${stu1.name.first}, ${stu2.name.first} - ${currGrade}`);
  });
}