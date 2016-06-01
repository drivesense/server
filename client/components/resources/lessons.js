'use strict';

angular.module('drivesenseApp')
  .service('$lessons', function ($resource) {
    return $resource('/api/lessons/:ctrl', {}, {
      'get': {method: 'GET', isArray: true},
      'save': {method: 'POST'},
      'schedule': {method: 'POST', isArray: true, params: {ctrl: 'schedule'}}
    });
  });