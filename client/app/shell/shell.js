'use strict';

angular.module('drivesenseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell', {
        abstract: true,
        templateUrl: 'app/shell/shell.html'
      });
  });