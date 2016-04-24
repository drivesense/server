'use strict';

angular.module('TripApp')
  .controller('EditEvent', function ($scope, event, users, $events, $users, $mdToast) {
    $scope.filterSelected = true;
    $scope.event = event;
    $scope.event.startDate = new Date($scope.event.startDate);
    $scope.event.endDate = new Date($scope.event.endDate);
    $scope.isEditing = false;
    $scope.query = {
      name: ''
    };

    $scope.users = users;

    $scope.updateFriends = function () {
      // check if admin remvoved
      $scope.event.users = _.union($scope.event.users, [$scope.event.admin]);
      console.log($scope.event.users);

      $events.updateUsers({id: $scope.event._id}, $scope.event).$promise
        .then(function () {
          $mdToast.show(
            $mdToast.simple()
              .position('bottom right')
              .content('Friends added')
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

    $scope.save = function () {
      $events.put({id: $scope.event._id}, $scope.event).$promise
        .then(function () {
          $scope.isEditing = false;
          $scope.eventInfoForm.dirty = false;
        })
    };

    $scope.edit = function () {
      $scope.isEditing = true;
    };

    $scope.filter = function (query) {
      return $users.getAll({name: query}).$promise
        .then(function (data) {
          return data.docs;
        });
    }
  });