'use strict';

angular.module('drivesenseApp')
  .directive('drivesenseSchedule', function (moment) {
    return {
      restrict: 'E',
      templateUrl: 'components/schedule/schedule.html',
      replace: true,
      scope: {
        api: '=',
        onLoad: '='
      },
      link: function (scope, element) {
        var groupBy = function (lessonsToGroup, by) {
          return _.groupBy(lessonsToGroup, function (lesson) {
            return moment(lesson.date).startOf(by);
          })
        };

        var buildIndex = function (lessons, lesson) {
          lesson.index = 0;

          _.forEach(lessons, function (otherLesson) {
            if (lesson._id === otherLesson._id) {
              return false;
            }

            if (moment(lesson.date).isBetween(moment(otherLesson.date), moment(otherLesson.date).add(otherLesson.duration, 'minutes'), null, '[)')
              && otherLesson.index <= lesson.index) {
              lesson.index++;
            }
          });
        };

        scope.selectedDay = 1;

        scope.days = _.times(7, function (i) {
          return moment().startOf('day').add(-1 + i, 'day');
        });

        scope.makeHours = function (day) {
          return _.times(16, function (i) {
            return moment(day).add(6 + i, 'hour');
          });
        };

        scope.makeQuarters = function (hour) {
          return _.times(4, function (i) {
            return moment(hour).add(15 * i, 'minutes');
          });
        };

        scope.getDay = function (day) {
          return day.calendar(null, {
            lastDay: '[Yesterday]',
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'ddd - DD/MM',
            sameElse: 'DD/MM/YYYY'
          });
        };

        scope.api.load = function (lessons) {
          scope.newLessons = _.mapValues(groupBy(lessons, 'day'), function (lessons) {
            return _.mapValues(groupBy(lessons, 'hour'), function (lessonsInHour) {
              return _.groupBy(lessonsInHour, function (lesson) {
                return moment(lesson.date);
              });
            });
          });

          _.forEach(lessons, function (lesson) {
            buildIndex(lessons, lesson);
          });
        };

        scope.onLoad();
      }
    };
  });
