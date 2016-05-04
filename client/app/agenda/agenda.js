'use strict';

angular.module('drivesenseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.agenda-teacher', {
        url: '/agenda-teacher',
        controller: 'AgendaTeacher',
        templateUrl: 'app/agenda/teacher/teacher.html',
        resolve: {
          lessons: function ($lessons) {
            return $lessons.query().$promise;
          }
        }
      });
  });