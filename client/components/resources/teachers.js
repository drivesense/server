'use strict';

angular.module('drivesenseApp')
  .service('$teachers', function ($resource) {
    return $resource('/api/teachers/:ctrl', {}, {
      'get': {method: 'GET', isArray: true},
      'schedule': {method: 'POST', isArray: true, params: {ctrl: 'schedule'}}
    });
  });