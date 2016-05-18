'use strict';

export default {
  paths: {
    client: {
      less: [
        'client/{app,components}/**/*.less',
        '!client/app/app.less'
      ],
      js: [
        'client/{app,components}/**/*.js',
        '!client/app/app.js'
      ],
      css: [
        'client/{app,components,.tmp}/**/*.css'
      ],
      html: [
        'client/{app,components}/**/*.html'
      ]
    },
    server: ['server/**/*.js'],
    alg: ['alg/**/*.js'],
    gulp: ['./gulpfile.js', './gulp/**/*.js']
  }
};