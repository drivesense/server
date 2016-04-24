'use strict';

angular.module('drivesenseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.user-settings', {
        url: '/settings/user-settings',
        templateUrl: 'app/settings/user-settings/user-settings.html',
        controller: 'UserSettings',
        resolve: {
          currentUser: function (Auth) {
            return Auth.getCurrentUser();
          }
        }
      });
  });
