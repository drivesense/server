'use strict';

angular.module('drivesenseApp')
  .service('$schools', function ($resource) {
    return $resource('/api/schools/:id', {}, {
      'get': {method: 'GET', isArray: true}
    });
  });