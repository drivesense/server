'use strict';

angular.module('drivesenseApp')
  .controller('Agenda', function ($scope, Auth, lessons, moment, $mdDialog, $timeout) {
    $scope.schedule = {};
    $scope.userType = Auth.getCurrentUser().type;

    $scope.onLoad = function () {
      $scope.schedule.load(lessons);
    };

    $scope.addNewLesson = function (ev, time) {
      $mdDialog.show({
        controller: 'NewLessonDialog',
        templateUrl: '/app/agenda/new-lesson/new-lesson.html',
        locals: {
          time: time
        },
        targetEvent: ev,
        clickOutsideToClose: true
      })
        .then(function (newLessons) {
          lessons = lessons.concat(newLessons);
          lessons = _.sortBy(lessons, 'date');
          $scope.schedule.load(lessons);
        });
    };

  });
