'use strict';

import config from '../config';
import env from 'gulp-env';

export default gulp => {
  gulp.task('env:test', () => {
    env({vars: {NODE_ENV: config.paths.env.test}});
  });

  gulp.task('env:prod', () => {
    env({vars: {NODE_ENV: config.paths.env.prod}});
  });
};