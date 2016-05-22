'use strict';

angular.module('drivesenseApp')
  .controller('AgendaStudent', function ($scope, Auth, lessons, $mdDialog, $students) {
    $scope.schedule = {};
    $scope.user = Auth.getCurrentUser();

    $scope.onLoad = function () {
      $scope.schedule.load(lessons);
    };

    $scope.addNewConstraint = function (ev, time) {
      $mdDialog.show({
        controller: 'NewConstraintDialog',
        templateUrl: '/app/agenda/student/new-constraint/new-constraint.html',
        locals: {
          time: time
        },
        targetEvent: ev,
        clickOutsideToClose: true
      })
        .then(function (constraint) {
          $students.constraints({constraint: constraint});

          $scope.user.constraints.push(constraint);
        });
    };
  });
