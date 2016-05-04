'use strict';

angular.module('drivesenseApp')
  .controller('AgendaStudent', function ($scope, Auth, lessons) {
    $scope.schedule = {};

    $scope.onLoad = function () {
      $scope.schedule.load(lessons);
    };
  });
