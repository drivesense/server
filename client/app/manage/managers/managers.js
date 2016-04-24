'use strict';

angular.module('drivesenseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.managers', {
        url: '/manage/managers',
        templateUrl: 'app/manage/managers/managers.html',
        controller: 'Managers',
        resolve: {
          managers: function ($managers) {
            return $managers.get().$promise;
          }
        },
        data: {
          requiredRole: 'admin'
        }
      });
  });
