'use strict';

angular.module('TripApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('exterior.login', {
        url: '/login',
        params: {popupMessage: ''},
        templateUrl: 'app/auth/login/login.html',
        controller: 'Login',
        data: {
          loginNotRequired: true,
          loggedInForbidden: true
        }
      });
  });