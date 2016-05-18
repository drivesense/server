'use strict';

angular.module('drivesenseApp')
  .controller('AgendaTeacher', function ($scope, lessons, moment, $mdDialog, $students, $q) {
    $scope.schedule = {};

    console.log(lessons);
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
      $scope.currentLesson = {
        lesson: lesson,
        participants: lesson.participants
      };

      lesson.participants.forEach(function (p) {
        $students.topics({id: p.student._id}).$promise
          .then(function (progress) {
            console.log(progress);
            $scope.currentLesson = {
              lesson: lesson,
              progress: progress
            };
          });
      })
    }
  });
