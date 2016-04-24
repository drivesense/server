'use strict';

angular.module('TripApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        data: {
          pageTitle: 'triplete'
        }
      });
  });