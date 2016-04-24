'use strict';

angular.module('drivesenseApp')
  .controller('Agenda', function ($scope, lessons) {
    $scope.lessons = lessons;
  });
