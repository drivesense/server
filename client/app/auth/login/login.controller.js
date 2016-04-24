'use strict';

angular.module('drivesenseApp')
  .controller('Login', function ($scope, $window, $state, $mdToast, Auth) {
    $scope.user = {};
    $scope.errors = {};
    $scope.submitted = false;

    if ($state.params.popupMessage) {
      $mdToast.show(
        $mdToast.simple()
          .position('bottom right')
          .content($state.params.popupMessage)
          .hideDelay(6000)
      );
    }

    $scope.login = function (form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then(function () {
            // Logged in, redirect to home
            $state.go('shell.home');
          })
          .catch(function (err) {
            if (err.name === 'IncorrectUsernameError' || err.name === 'IncorrectPasswordError') {
              $mdToast.show(
                $mdToast.simple()
                  .position('bottom right')
                  .content('email or password incorrect')
                  .hideDelay(6000)
              );
            }
            $scope.errors.other = err.message;
          });
      }
    };
  });
