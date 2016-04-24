'use strict';

angular.module('drivesenseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.schools', {
        url: '/manage/schools',
        templateUrl: 'app/manage/schools/schools.html',
        controller: 'Schools',
        resolve: {
          schools: function ($schools) {
            return $schools.get().$promise;
          }
        },
        data: {
          requiredRole: 'admin'
        }
      });
  });
