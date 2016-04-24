'use strict';

angular.module('drivesenseApp')
  .controller('Managers', function ($scope, managers) {
    $scope.managers = managers;
  });