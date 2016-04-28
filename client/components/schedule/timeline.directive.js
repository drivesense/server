'use strict';

angular.module('drivesenseApp')
  .directive('dsTimeline', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<span class="ds-timeline" md-colors="{borderColor: \'accent-700\'}"></span>',
      scope: {
        leftover: '@'
      },
      link: function (scope, elem, attrs) {
        attrs.$observe('leftover', function (leftover) {
          elem.css('top', (leftover / 15 * 100) + '%');
        })
      }
    }
  });
