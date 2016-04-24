'use strict';

angular.module('drivesenseApp')
  .controller('Schools', function ($scope, schools) {
    $scope.schools = schools;
  });