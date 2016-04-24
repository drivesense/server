'use strict';

angular.module('drivesenseApp')
  .service('$students', function ($resource) {
    return $resource('/api/students/:id', {}, {
      'get': {method: 'GET', isArray: true}
    });
  });