'use strict';

angular.module('drivesenseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.agenda.student', {
        url: '/agenda/student',
        controller: 'AgendaStudent',
        templateUrl: 'app/agenda/student/student.html',
        data: {
          requiredRole: 'student'
        }
      });
  });