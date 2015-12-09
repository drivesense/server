'use strict';

export default {
  paths: {
    server: ['server/**/*.js', '!server/**/*.spec.js'],
    test: './server/**/*.spec.js',
    gulp: ['./gulpfile.js', './gulp/**/*.js'],
    coverage: 'coverage/**/lcov.info',
    certs: './server/config/certs'
  }
};