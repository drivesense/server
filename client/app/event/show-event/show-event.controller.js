'use strict';

angular.module('TripApp')
  .controller('ShowEvent', function ($scope, event, $events) {
    $scope.event = event;
    $scope.event.startDate = new Date($scope.event.startDate);
    $scope.event.endDate = new Date($scope.event.endDate);
    $scope.isEditing = false;

    $scope.filter = function (name) {
      return _.find($scope.users, function (user) {
        return (user.name.first + ' ' + user.name.second) === name;
      });
    }
  });