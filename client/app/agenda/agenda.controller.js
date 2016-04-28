'use strict';

angular.module('drivesenseApp')
  .controller('Agenda', function ($scope, Auth, lessons, moment, $mdDialog, $timeout) {
    $scope.schedule = {};
    $scope.userType = Auth.getCurrentUser().type;

    $scope.onLoad = function () {
      $scope.schedule.load(lessons);
      $scope.updateInfo();
    };

    $scope.updateInfo = function () {
      var now = moment().startOf('day').add(16, 'hours').add(30, 'minutes');
      var nextLessonsTime = moment(_.find(lessons, function (lesson) {
        return moment(lesson.date).isAfter(now);
      }).date);

      $scope.currentLessons = _.filter(lessons, function (lesson) {
        return now.isBetween(moment(lesson.date), moment(lesson.date).add(lesson.duration, 'minutes'), null, '[)');
      });

      $scope.lastLessons = _.filter(lessons, function (lesson) {
        return moment(lesson.date).add(lesson.duration, 'minutes').isBetween(moment(now).subtract(10, 'minutes'), now, null, '[]');
      });

      $scope.nextLessons = _.filter(lessons, function (lesson) {
        return nextLessonsTime.isSame(moment(lesson.date));
      });
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
