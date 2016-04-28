'use strict';

angular.module('drivesenseApp')
  .directive('dsLesson', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: `<md-card class="lesson" md-colors="{background: ::theme}" ng-transclude md-ink-ripple>                  
                </md-card>`,
      scope: {
        duration: '=',
        index: '@',
        theme: '@'
      },
      link: function (scope, elem) {
        elem.css('left', (182 * scope.index) + 'px');
        elem.css('height', (scope.duration / 15 * 100) + '%');
      }
    }
  });
