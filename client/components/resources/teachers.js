'use strict';

angular.module('drivesenseApp')
  .service('$teachers', function ($resource) {
    return $resource('/api/teachers/:id', {}, {
      'get': {method: 'GET', isArray: true}
    });
  });