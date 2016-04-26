'use strict';

import createError from 'http-errors';

// inject:route-imports
import userRoute from '../../api/user';
import studentRoute from '../../api/student';
import managerRoute from '../../api/manager';
import schoolRoute from '../../api/school';
import teacherRoute from '../../api/teacher';
import lessonRoute from '../../api/lesson';
import topicRoute from '../../api/topic';

import authRoute from '../../auth';

export default app => {
  // inject:route-usage
  app.use('/api/users', userRoute);
  app.use('/api/students', studentRoute);
  app.use('/api/managers', managerRoute);
  app.use('/api/schools', schoolRoute);
  app.use('/api/teachers', teacherRoute);
  app.use('/api/lessons', lessonRoute);
  app.use('/api/topics', topicRoute);

  app.use('/auth', authRoute);

  // All undefined api routes should return a 404
  app.route('/:url(api|auth)/*')
    .get((req, res, next) => {
      next(createError(404));
    });
};
