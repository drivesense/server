'use strict';

angular.module('drivesenseApp')
  .controller('Agenda', function ($scope, Auth, lessons, moment, $mdDialog) {
    $scope.userType = Auth.getCurrentUser().type;
    $scope.selectedDay = 1;

    $scope.days = _.times(7, function (i) {
      return moment().startOf('day').add(-1 + i, 'day');
    });

    $scope.makeHours = function (day) {
      return _.times(16, function (i) {
        return moment(day).add(6 + i, 'hour');
      });
    };

    $scope.makeQuarters = function (hour) {
      return _.times(4, function (i) {
        return moment(hour).add(15 * i, 'minutes');
      });
    };

    $scope.getDay = function (day) {
      return day.calendar(null, {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'ddd - DD/MM',
        sameElse: 'DD/MM/YYYY'
      });
    };

    var groupBy = function (lessonsToGroup, by) {
      return _.groupBy(lessonsToGroup, function (lesson) {
        return moment(lesson.date).startOf(by);
      })
    };

    $scope.newLessons = _.mapValues(groupBy(lessons, 'day'), function (lessons) {
      return _.mapValues(groupBy(lessons, 'hour'), function (lessonsInHour) {
        return _.groupBy(lessonsInHour, function (lesson) {
          return moment(lesson.date);
        });
      });
    });

    $scope.addNewLesson = function (time) {
      //$mdDialog.show()
    }
  });
