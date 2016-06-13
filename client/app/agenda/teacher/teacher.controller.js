'use strict';

angular.module('drivesenseApp')
  .controller('AgendaTeacher', function ($scope, lessons, moment, $mdDialog, $students, $lessons, topics) {
    $scope.schedule = {};
    $scope.totalProgress = {};

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
      $scope.totalProgress = {};
      $scope.currentLesson = lesson;

      lesson.participants.forEach(function (participant) {
        participant.progress = participant.progress.concat(_.map(_.differenceBy(topics, _.map(participant.progress, 'topic'), '_id'), function (topic) {
          return {
            topic: topic,
            grade: null
          };
        }));

        $students.topics({id: participant.student._id}).$promise
          .then(function (progress) {
            $scope.totalProgress[participant.student._id] = _.keyBy(progress, 'topic._id');
          });
      })
    };

    $scope.save = function () {
      $scope.currentLesson.participants.forEach(function (participant) {
        participant.progress = _.filter(participant.progress, function (prog) {
          return !(!prog.grade && !prog._id);
        })
      });

      $lessons.update({id: $scope.currentLesson._id}, $scope.currentLesson).$promise
        .then(function () {
          $scope.selectLesson($scope.currentLesson);
        });
    };
  });
