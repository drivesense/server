'use strict';

angular.module('drivesenseApp')
  .service('$lessons', function ($resource) {
    return $resource('/api/lessons/:id/:controller', {id: '@_id'}, {
      'get': {method: 'GET', isArray: true},
      'update': {method: 'PUT'},
      'schedule': {method: 'POST', isArray: true, params: {controller: 'schedule'}}
    });
  });