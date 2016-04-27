'use strict';

angular.module('drivesenseApp')
  .directive('updateTitle', function ($rootScope, $timeout) {
    return {
      restrict: 'A',
      scope: {
        defaultTitle: '@'
      },
      link: function (scope, element) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
          var title = scope.defaultTitle || '';

          if (toState.data && toState.data.pageTitle) {
            title = toState.data.pageTitle;
          }

          $timeout(function() {
            element.text(title);
          }, 0, false);
        });
      }
    };
  });
