'use strict';

angular.module('drivesenseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.agenda', {
        url: '/agenda',
        controller: 'Agenda',
        templateUrl: 'app/agenda/agenda.html'
      });
  });