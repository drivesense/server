import 'dotenv/config';
import '../server/api/lesson/lesson.model';
import '../server/api/user/user.model';
import '../server/api/topic/topic.model';
import '../server/api/school/school.model';
import logger from '../server/components/logger';
import mongoose from 'mongoose';
import moment from 'moment';
import mongooseConfig from '../server/config/mongoose';
import {getMatches} from './util';

mongooseConfig(mongoose)
  .then(() => {
    return getMatches(moment());
  })
  .then(matches => {
    logger.info(matches);
  })
  .catch(err => {
    logger.error(err);
  });

mongoose.connect(process.env.MONGO_URI);