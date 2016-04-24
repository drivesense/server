'use strict';

angular.module('TripApp')
  .controller('SignupCtrl', function ($scope, Auth, $state, $window) {
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          displayName: $scope.user.name.first + ' ' + $scope.user.name.second,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(function() {
          // Account created, redirect to home
          $state.go('shell.home');
        })
        .catch(function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            form[field].$setDirty();
          });
        });
      }
    };

    $scope.validatePassword = function(){
      var validity = true;

      if ($scope.user.passwordValidate !== $scope.user.password){
        validity = false;
      }

      $scope.signupForm.passwordValidate.$setValidity('notEqual', validity);
    };
  });
