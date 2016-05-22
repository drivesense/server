'use strict';

angular.module('drivesenseApp')
  .service('$students', function ($resource) {
    return $resource('/api/students/:id/:ctrl', {id: '@_id'}, {
      'get': {method: 'GET', isArray: true},
      'topics': {method: 'GET', isArray: true, params: {ctrl: 'topics'}},
      'constraints': {method: 'PUT', params: {id: 'me', ctrl: 'constraints'}}
    });
  });