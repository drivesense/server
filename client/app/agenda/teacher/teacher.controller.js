'use strict';

angular.module('drivesenseApp')
  .controller('AgendaTeacher', function ($scope, lessons, moment, $mdDialog, $students, $q) {
    $scope.schedule = {};

    $scope.onLoad = function () {
      $scope.schedule.load(lessons);
    };

    $scope.addNewLesson = function (ev, time) {
      $mdDialog.show({
          controller: 'NewLessonDialog',
          templateUrl: '/app/agenda/teacher/new-lesson/new-lesson.html',
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
    $scope.selectLesson = function (lesson) {
      $students.topics({id: lesson.student._id}).$promise
        .then(function (progress) {
          $scope.currentLesson = {
            lesson: lesson,
            progress: progress
          };
        });
    }
  });
