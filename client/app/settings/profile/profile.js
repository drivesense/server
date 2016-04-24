'use strict';

angular.module('drivesenseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.profile', {
        url: '/settings/profile',
        templateUrl: 'app/settings/profile/profile.html',
        controller: 'Profile',
        resolve: {
          currentUser: function (Auth) {
            return Auth.getCurrentUser();
          }
        }
      });
  });
