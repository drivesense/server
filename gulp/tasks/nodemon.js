'use strict';

import {resolve} from 'path';
import config from '../config';
import nodemon from 'gulp-nodemon';

export default gulp => {
  gulp.task('nodemon', () => {
    return nodemon({
      exec: resolve('./node_modules/.bin/babel-node'),

      script: 'server/app.js',

      options: {
        nodeArgs: ['--debug']
      },

      // Watch core server file(s) that require server restart on change
      watch: [config.paths.server]
    });
  });

  gulp.task('nodemon:alg', () => {
    return nodemon({
      exec: resolve('./node_modules/.bin/babel-node'),

      script: 'alg/index.js',

      options: {
        nodeArgs: ['--debug']
      },

      // Watch core server file(s) that require server restart on change
      watch: [config.paths.alg].concat(config.paths.server)
    });
  });
};