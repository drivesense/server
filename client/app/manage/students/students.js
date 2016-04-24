'use strict';

angular.module('drivesenseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.students', {
        url: '/manage/students',
        templateUrl: 'app/manage/students/students.html',
        controller: 'Students',
        resolve: {
          students: function ($students) {
            return $students.get().$promise;
          }
        },
        data: {
          requiredRole: 'teacher'
        }
      });
  });
