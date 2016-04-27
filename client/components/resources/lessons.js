'use strict';

angular.module('drivesenseApp')
  .service('$lessons', function ($resource) {
    return $resource('/api/lessons/:id', {}, {
      'get': {method: 'GET', isArray: true},
      'save': {method: 'POST'}
    });
  });