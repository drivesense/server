import _ from 'lodash';
import Topic from '../../../api/topic/topic.model';
import distance from 'gps-distance';
import {combination} from './match';
import {getStudents} from './source';

const createNormalizer = (students, grader) => {
  const pairs = combination(students);
  const minGradePair = _.minBy(pairs, grader);
  const maxGradePair = _.maxBy(pairs, grader);
  const minGrade = grader(minGradePair);
  const maxGrade = grader(maxGradePair);

  return pair => ((grader(pair) - minGrade) / (maxGrade - minGrade));
};

export function createNormalize(date, teacher) {
  return Promise.all([getStudents(teacher), Topic.find({})])
    .then(([students, topics]) => {
      const locationNormalize = createNormalizer(students, ([stu1, stu2]) => distance([stu1.location, stu2.location]));
      const topicsNormalize = createNormalizer(students, ([stu1, stu2]) => {
        const grades = topics.map(topic => {
          const stu1Grade = (stu1.progress[topic._id] || {grade: 0}).grade;
          const stu2Grade = (stu2.progress[topic._id] || {grade: 0}).grade;

          return 1 - Math.abs(stu1Grade - stu2Grade) / 10;
        });

        return _.mean(grades);
      });

      return {
        location(stu1, stu2) {
          return 1 - locationNormalize([stu1, stu2]);
        },
        topics(stu1, stu2) {
          return topicsNormalize([stu1, stu2]);
        }
      }
    });
}