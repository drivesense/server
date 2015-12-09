'use strict';

import config from '../config';
import nodemon from 'nodemon';

export default gulp => {
  gulp.task('nodemon', cb => {
    nodemon({
      script: 'server/app.js',

      options: {
        nodeArgs: ['--debug']
      },

      // Watch core server file(s) that require server restart on change
      watch: [config.paths.server]
    })
      .once('start', cb);
  });
};