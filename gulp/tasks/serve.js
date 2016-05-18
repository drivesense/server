'use strict';

import runSequence from 'run-sequence';

export default gulp => {
  gulp.task('serve', cb => {
    runSequence(
      'clean:tmp',
      'less',
      'inject:css',
      'inject:js',
      'wiredep',
      'livereload',
      'nodemon',
      'open',
      'watch',
      cb);
  });

  gulp.task('serve:alg', cb => {
    runSequence(
      'nodemon:alg',
      cb);
  });
};