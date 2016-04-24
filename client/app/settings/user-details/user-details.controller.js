'use strict';

angular.module('TripApp')
  .controller('UserDetailsCtrl', function ($scope, $mdToast, Auth, User) {
    // TODO: use _.pick for relevent fields
    $scope.user = angular.copy(Auth.getCurrentUser());

    $scope.revalidate = function () {
      User.revalidate({_id: $scope.user._id})
        .$promise
        .then(function () {
          // stuff
          Auth.refreshCurrentUser();
        })
        .catch(function (error) {
          //$mdToast.show(
          //  $mdToast.simple()
          //    .content(error.data.message || 'ארעה שגיאה, אנא נסה שנית מאוחר יותר.')
          //    .hideDelay(6000)
          //);

          console.log(error);
        });
    };

    $scope.changeUserInfo = function () {
      User.update({id: $scope.user._id}, $scope.user)
        .$promise
        .then(function () {
          return Auth.refreshCurrentUser();
        })
        .then(function (user) {
          $scope.user = angular.copy(user);
          $mdToast.show(
            $mdToast.simple()
              .position('bottom right')
              .content('details updated successfully')
              .hideDelay(6000)
          );
        })
        .catch(function () {
          $mdToast.show(
            $mdToast.simple()
              .position('bottom right')
              .content('an error occur, in saving content, please try again.')
              .hideDelay(6000)
          );
        });
    };
  });
