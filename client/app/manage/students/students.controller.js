'use strict';

angular.module('drivesenseApp')
  .controller('Students', function ($scope, students) {
    $scope.students = students;
  });