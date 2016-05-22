import _ from 'lodash';
import User from '../../../api/user/user.model';
import Topic from '../../../api/topic/topic.model';
import distance from 'gps-distance';
import {combination} from './match';

export function createNormalize(date, teacher) {
  return Promise.all([User.find({type: 'student'}), Topic.find({})])
    .then(([students, topics]) => {
      const pairs = combination(_.map(students, 'location'));
      const minDistancePair = _.minBy(pairs, pair => distance(pair));
      const maxDistancePair = _.maxBy(pairs, pair => distance(pair));
      const minDistance = distance(minDistancePair);
      const maxDistance = distance(maxDistancePair);
      const normalize = d => (d - minDistance) / (maxDistance - minDistance);

      return {
        location(stu1, stu2) {
          // return 1 / distance([stu1.location, stu2.location]);
          return 1 - normalize(distance([stu1.location, stu2.location]));
        },
        topics(topics) {

        }
      }
    });
}