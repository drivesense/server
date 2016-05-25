'use strict';

angular.module('drivesenseApp')
  .controller('AgendaStudent', function ($scope, Auth, lessons, $mdDialog, $students) {
    $scope.schedule = {};
    $scope.user = Auth.getCurrentUser();

    var lastLesson = _.find(lessons, function (lesson) {
      return moment(lesson.date).isBefore(moment());
    });

    var nextLesson = _.find(lessons, function (lesson) {
      return moment(lesson.date).isAfter(moment());
    });

    $scope.lastLesson = lastLesson ? moment(lastLesson.date).format('LLLL') : 'NaN';
    $scope.nextLesson = nextLesson ? moment(nextLesson.date).format('LLLL') : 'NaN';
    $scope.numOfLessons = lessons.length;

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
