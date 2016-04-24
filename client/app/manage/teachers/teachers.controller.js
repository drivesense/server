'use strict';

angular.module('drivesenseApp')
  .controller('Teachers', function ($scope, teachers) {
    $scope.teachers = teachers;
  });