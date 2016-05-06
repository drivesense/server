'use strict';

angular.module('drivesenseApp')
  .directive('dsSchedule', function (moment, $mdColorPalette, $interval) {
    return {
      restrict: 'E',
      templateUrl: 'components/schedule/schedule.html',
      replace: true,
      scope: {
        api: '=',
        onLoad: '=',
        display: '@',
        addNewLesson: '&',
        lessonDetails: '&'
      },
      link: function (scope) {
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

        var buildTheme = function (lesson) {
          var palettes = Object.keys($mdColorPalette);
          var hues = Object.keys($mdColorPalette[palettes[0]]).filter(function (hue) {
            return !hue.startsWith('A');
          });

          var hashCode = function(str) {
            var hash = 0, i, chr, len;
            if (str.length === 0) return hash;
            for (i = 0, len = str.length; i < len; i++) {
              chr   = str.charCodeAt(i);
              hash  = ((hash << 5) - hash) + chr;
              hash |= 0; // Convert to 32bit integer
            }
            return Math.abs(hash);
          };

          var hash = hashCode(lesson.student._id);
          lesson.theme = palettes[hash % palettes.length] + '-' + hues[hash % hues.length] + '-0.7';
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
            buildTheme(lesson);
          });
        };

        scope.onLoad();

        scope.selectLesson = function (ev, lesson) {
          ev.stopPropagation();
          ev.preventDefault();

          scope.lessonDetails()(lesson);
        };

        scope.now = new moment();

        $interval(function () {
          scope.now = new moment();
        }, 1000);

        scope.currentTime = function (hour, quarter) {
          return hour.hour() == scope.now.hour() && Math.floor(quarter.minutes() / 15) == Math.floor(scope.now.minutes() / 15);
        }
      }
    };
  });
