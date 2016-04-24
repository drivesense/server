'use strict';

angular.module('drivesenseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.teachers', {
        url: '/manage/teachers',
        templateUrl: 'app/manage/teachers/teachers.html',
        controller: 'Teachers',
        resolve: {
          schools: function ($teachers) {
            return $teachers.get().$promise;
          }
        }
      });
  });
