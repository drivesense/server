'use strict';

angular.module('drivesenseApp')
  .service('$lessons', function ($resource) {
    return $resource('/api/lessons/:id/:ctrl/:student', {id: '@_id'}, {
      'get': {method: 'GET', isArray: true},
      'save': {method: 'POST'},
      'topics': {method: 'GET', isArray: true, params: {ctrl: 'topics'}}
    });
  });