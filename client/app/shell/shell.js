'use strict';

angular.module('TripApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell', {
        abstract: true,
        templateUrl: 'app/shell/shell.html'
      });
  });