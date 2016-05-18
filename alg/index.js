import 'dotenv/config';
import '../server/api/lesson/lesson.model';
import '../server/api/user/user.model';
import '../server/api/topic/topic.model';
import '../server/api/school/school.model';
import logger from '../server/components/logger';
import mongoose from 'mongoose';
import moment from 'moment';
import mongooseConfig from '../server/config/mongoose';
import {getLessons} from './greedy';
import {print} from './util/measure';

mongooseConfig(mongoose)
  .then(() => {
    return getLessons(moment());
  })
  .then(lessons => {
    print('greedy', lessons);
  })
  .catch(err => {
    logger.error(err);
  });

mongoose.connect(process.env.MONGO_URI);