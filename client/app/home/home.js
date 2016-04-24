'use strict';

angular.module('drivesenseApp')
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