'use strict';

import runSequence from 'run-sequence';

export default gulp => {
  gulp.task('serve', cb => {
    runSequence(
      'eslint',
      'nodemon',
      'open',
      cb);
  });
};