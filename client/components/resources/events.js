'use strict'

angular.module('TripApp')
  .service('$events', function ($resource) {
    return $resource('/api/events/:id', {}, {
      'get': {method: 'GET', isArray: true},
      'getById': {method: 'GET', url: '/api/events/:id/user'},
      'updateUsers': {method: 'PUT', url: '/api/events/users/:id'},
      'post': {method: 'POST'},
      'put': {method: 'PUT'},
      'delete': {method: 'DELETE'}
    });
  });