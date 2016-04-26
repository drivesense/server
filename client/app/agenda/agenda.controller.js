'use strict';

angular.module('drivesenseApp')
  .controller('Agenda', function ($scope, Auth, lessons, moment) {
    $scope.userType = Auth.getCurrentUser().type;
    var groupBy = function (lessons, sheker) {
      return _.groupBy(lessons, function(lesson) {
        return moment(lesson.date).startOf(sheker);
      })
    };

    var dayLessons = groupBy(lessons, 'day');
    var hourLessons = _.mapValues(dayLessons, function (lessons) {
      return _.groupBy(lessons, 'hour')
    });

    $scope.lessons = _.mapValues(hourLessons, function (lessons) {
      return _.groupBy(lessons, function(lesson) {
        return moment(lesson.date);
      });
    });


    console.log($scope.lessons);

    $scope.days = _.times(7, function(i) {
      return moment().startOf('day').add(-1 + i, 'day');
    });

    $scope.hours = _.times(16, function (i) {
      return moment().startOf('day').add(6 + i, 'hour');
    });

    $scope.getDay = function (day) {
      return day.calendar(null, {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd - DD/MM',
        sameElse: 'DD/MM/YYYY'
      });
    };

  });
