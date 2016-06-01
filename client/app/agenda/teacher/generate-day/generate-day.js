'use strict';

angular.module('drivesenseApp')
  .controller('GenerateDayDialog', function ($scope, Auth, $lessons, $teachers, $mdDialog, day) {
    $teachers.schedule({date: day}).$promise
      .then(function (lessons) {
        $scope.lessons = lessons;
      });

    $scope.save = function () {
      $mdDialog.hide($scope.lessons);
    }
  });