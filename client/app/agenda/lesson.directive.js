'use strict';

angular.module('drivesenseApp')
  .directive('lesson', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      template: `<md-card class="lesson" md-colors="{background: 'accent-700-0.5'}" ng-transclude>                  
                </md-card>`,
      scope: {
        duration: '=',
        index: '@'
      },
      link: function (scope, elem) {
        elem.css('left', (258 * scope.index) + 'px');
        elem.css('height', (scope.duration / 15 * 100) + '%');
      }
    }
  });
