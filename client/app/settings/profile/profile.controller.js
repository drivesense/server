'use strict';

angular.module('drivesenseApp')
  .controller('Profile', function ($scope, $state, $mdToast, currentUser, $users) {
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
        })
        .catch(function () {
          $mdToast.show(
            $mdToast.simple()
              .position('bottom right')
              .content('an unexpected error occurred')
              .hideDelay(6000)
          );
        });
    };

    $scope.changePassword = function (oldPassword, newPassword) {
      $users.changePassword({id: $scope.user._id}, {oldPassword: oldPassword, newPassword: newPassword}).$promise
        .then(function () {
          $mdToast.show(
            $mdToast.simple()
              .position('bottom right')
              .content('The details was saved successfully')
              .hideDelay(6000)
          );
        })
        .catch(function () {
          $mdToast.show(
            $mdToast.simple()
              .position('bottom right')
              .content('an unexpected error occurred')
              .hideDelay(6000)
          );
        });
    };
  });