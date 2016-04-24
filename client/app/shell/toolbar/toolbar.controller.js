'use strict';

angular.module('TripApp')
  .controller('ToolBar', function ($scope, $mdSidenav, $mdComponentRegistry) {
    $scope.isNavIconOpened = false;

    $scope.$watch(function () {
      return $mdComponentRegistry.get('sideNav') ? $mdSidenav('sideNav').isOpen() : false;
    }, function (newVal) {
      $scope.isNavIconOpened = newVal;
    });

    $scope.toggleMenu = function () {
      $mdSidenav('sideNav').toggle();
    };
  });
