'use strict';

angular.module('TripApp')
  .controller('NewEvent', function ($scope, $events, $mdToast, $mdDialog, Auth) {
    var currentUser = Auth.getCurrentUser();

    $scope.event = {
      admin: currentUser,
      users: [currentUser]
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    }

    $scope.createEvent = function () {
      $events.post($scope.event).$promise
        .then(function () {
          $mdToast.show(
            $mdToast.simple()
              .position('bottom right')
              .content('The event was created successfully')
              .hideDelay(6000)
          );

          $mdDialog.hide();
        })
        .catch(function (err) {
          $mdToast.show(
            $mdToast.simple()
              .position('bottom right')
              .content('an unexpected error occurred')
              .hideDelay(6000)
          );

          $mdDialog.cancel(err);
        });
    }
  });