'use strict';

angular.module('drivesenseApp')
  .controller('AgendaTeacher', function ($scope, lessons, moment, $mdDialog, $students, $lessons) {
    $scope.schedule = {};

    $scope.onLoad = function () {
      $scope.schedule.load(lessons);
    };

    $scope.generateDay = function (ev) {
      $mdDialog.show({
        controller: 'GenerateDayDialog',
        templateUrl: '/app/agenda/teacher/generate-day/generate-day.html',
        locals: {
          day: $scope.schedule.getDay()
        },
        targetEvent: ev,
        clickOutsideToClose: true
      })
        .then(function (newLessons) {
          lessons = lessons.concat(newLessons);
          lessons = _.sortBy(lessons, 'date');
          $scope.schedule.load(lessons);
          $lessons.schedule({lessons: newLessons});
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
