'use strict';

angular.module('drivesenseApp')
  .controller('ChangePasswordCtrl', function ($scope, $mdToast, Auth) {
    $scope.changePassword = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.password.old, $scope.password.new)
          .then(function () {
            $mdToast.show(
              $mdToast.simple()
                .position('bottom right')
                .content('password changed successfully!')
                .hideDelay(6000)
            );
            $scope.password = {};
            $scope.form.$setPristine();
          })
          .catch(function (err) {
            var message = 'an error has occur, please try again';

            if(err.status === '403'){
              message = 'the entered password is incorrect, try again';
            }

            form.passwordOld.$setValidity('badPassword', false);
            $mdToast.show(
              $mdToast.simple()
                .position('bottom right')
                .content(message)
                .hideDelay(6000)
            );
          });
      }
    };

    $scope.validatePassword = function(){
      var validity = true;

      if ($scope.password.newVerify !== $scope.password.new){
        validity = false;
      }

      $scope.form.passwordNewVerify.$setValidity('notEqual', validity);
    };

    $scope.oldPasswordChanged = function(){
      if(!$scope.form.passwordOld.$verify){
        $scope.form.passwordOld.$setValidity('badPassword', true);
      }
    };
  });
