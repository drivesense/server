'use strict';

angular.module('drivesenseApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('exterior.signup', {
        url: '/signup/:data',
        params: {data: {value: null, squash: true}},
        templateUrl: 'app/auth/signup/signup.html',
        controller: 'SignupCtrl',
        data: {
          loginNotRequired: true,
          loggedInForbidden: true
        }
      });
  });