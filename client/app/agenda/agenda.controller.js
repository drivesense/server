'use strict';

angular.module('drivesenseApp')
  .controller('Agenda', function ($scope, Auth, lessons, moment) {
    $scope.userType = Auth.getCurrentUser().type;
    var groupBy = function (lessonsToGroup, by) {
      return _.groupBy(lessonsToGroup, function(lesson) {
        return moment(lesson.date).startOf(by);
      })
    };

    var dayLessons = groupBy(lessons, 'day');
    $scope.newLessons = _.mapValues(dayLessons, function (lessons) {
      var byHours = groupBy(lessons, 'hour');

      byHours =_.mapValues(byHours, function (temp2) {
        return _.groupBy(temp2, function(lesson) {
          return moment(lesson.date);
        });
      });

      return byHours;
    });

    $scope.days = _.times(7, function(i) {
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
        nextWeek: 'dddd - DD/MM',
        sameElse: 'DD/MM/YYYY'
      });
    };

  });
