'use strict';

angular.module('drivesenseApp')
  .controller('Profile', function ($scope, $window, $state, $mdToast, currentUser, $users) {
    $scope.user = currentUser;

    $scope.saveChanges = function () {
      $users.update({id: $scope.user._id}, $scope.user).$promise
        .then(function () {
          $mdToast.show(
            $mdToast.simple()
              .position('bottom right')
              .content('The details was saved successfully')
              .hideDelay(6000)
          );

          // Logged in, redirect to home
          $state.go('shell.home');
        })
        .catch(function () {
          $mdToast.show(
            $mdToast.simple()
              .position('bottom right')
              .content('an unexpected error occurred')
              .hideDelay(6000)
          );
        });
    }
  });