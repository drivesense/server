'use strict';

angular.module('drivesenseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('exterior', {
        abstract: true,
        templateUrl: 'app/exterior/exterior.html'
      });
  });