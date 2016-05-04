'use strict';

angular.module('drivesenseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.agenda', {
        abstract: true,
        templateUrl: 'app/agenda/agenda.html',
        resolve: {
          lessons: function ($lessons) {
            return $lessons.query().$promise;
          }
        }
      });
  });