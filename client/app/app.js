'use strict';

angular.module('drivesenseApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'angularMoment',
    'ngMaterial',
    'angular-hamburglar',
    'ngMessages',
    'md.data.table',
    'uiGmapgoogle-maps'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('amber');
  })
  .factory('authInterceptor', function ($q, $cookieStore, $injector) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        if (response.status === 401) {
          $injector.get('$state').go('exterior.login');

          // remove any stale tokens
          $cookieStore.remove('token');
        }
        else if (response.status === 403) {
          $injector.get('$state').go('shell.home');
        }

        return $q.reject(response);
      }
    };
  })
  .run(function ($rootScope, Auth, amMoment, $state) {
    // Redirect to login if you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      next.data = next.data || {};

      if (!next.data.loginNotRequired) {
        Auth.isLoggedInAsync()
          .then(function (loggedIn) {
            if (loggedIn) {
              if (next.data.requiredRole && !Auth.hasRole(next.data.requiredRole)) {
                event.preventDefault();
                $state.go('shell.home');
              }
            } else {
              event.preventDefault();
              $state.go('exterior.login');
            }
          });
      }
      else if (next.data.loggedInForbidden) {
        Auth.isLoggedInAsync()
          .then(function (loggedIn) {
            if (loggedIn) {
              event.preventDefault();
              $state.go('shell.home');
            }
          });
      }
    });
  });
