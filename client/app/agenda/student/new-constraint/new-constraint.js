'use strict';

angular.module('drivesenseApp')
  .controller('NewConstraintDialog', function ($scope, time, Auth, $lessons, $students, $mdDialog) {
    time = time || moment().startOf('day').add(6, 'hours');

    $scope.date = time.toDate();
    $scope.start = time.clone().toDate();
    $scope.end = time.clone().add(45, 'minutes').toDate();

    $scope.duration = 45;

    $scope.save = function () {
      var day = moment($scope.date).startOf('day');
      var start = moment($scope.start);
      var end = moment($scope.end);

      $mdDialog.hide({
        start: day.clone().add(start.hours(), 'hours').add(start.minutes(), 'minutes').toDate(),
        end: day.clone().add(end.hours(), 'hours').add(end.minutes(), 'minutes').toDate(),
        duration: $scope.duration
      });
    }
  });