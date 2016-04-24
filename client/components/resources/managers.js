'use strict';

angular.module('drivesenseApp')
  .service('$managers', function ($resource) {
    return $resource('/api/managers/:id', {}, {
      'get': {method: 'GET', isArray: true}
    });
  });