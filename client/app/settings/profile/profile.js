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
          },
          topics: function ($students, Auth) {
            return Auth.getCurrentUser().$promise
              .then(function (user) {
                return $students.topics({id: user._id}).$promise
              })
          }
        }
      });
  });
