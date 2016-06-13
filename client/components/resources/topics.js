'use strict';

angular.module('drivesenseApp')
  .service('$topics', function ($resource) {
    return $resource('/api/topics', {}, {
      'get': {method: 'GET', isArray: true}
    });
  });