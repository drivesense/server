'use strict';

angular.module('TripApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('exterior', {
        abstract: true,
        templateUrl: 'app/exterior/exterior.html'
      });
  });