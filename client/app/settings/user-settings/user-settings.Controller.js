angular.module('TripApp')
  .controller('UserSettings', function ($scope, $window, $state, $mdToast, currentUser, $users) {
    $scope.errors = {};
    $scope.user = {};
    $scope.user.features = {};
    $scope.user = currentUser;

    $scope.ageRange = [
      {name: '0-20', val: 0},
      {name: '20-25', val: 1},
      {name: '25-30', val: 2},
      {name: '30-35', val: 3},
      {name: '35-45', val: 4},
      {name: '45-99', val: 5}
    ];

    $scope.tripType = [
      {name: 'Nature', val: 0, class: 'mdi mdi-nature'},
      {name: 'Urban', val: 1, class: 'mdi mdi-city'},
      {name: 'ChiilOut', val: 2, class: 'mdi mdi-airballoon'},
      {name: 'Romantic', val: 3, class: 'mdi mdi-heart'}];

    $scope.favoriteLocations = [
      {name: 'North', val: 1, class: 'mdi mdi-trending-up'},
      {name: 'Center', val: 2, class: 'mdi mdi-trending-neutral'},
      {name: 'South', val: 3, class: 'mdi mdi-trending-down'}];

    $scope.extremeLevel = [
      {name: 'Low', val: 1, class: 'mdi mdi-battery-20'},
      {name: 'Medium', val: 2, class: 'mdi mdi-battery-60'},
      {name: 'Hight', val: 3, class: 'mdi mdi-battery'}
    ];

    $scope.saveChanges = function () {
      $users.update({id: $scope.user._id}, $scope.user).$promise
        .then(function () {
          $mdToast.show(
            $mdToast.simple()
              .position('bottom right')
              .content('The details was saved successfully')
              .hideDelay(6000)
          );

          // Logged in, redirect to home
          $state.go('shell.home');
        })
        .catch(function () {
          $mdToast.show(
            $mdToast.simple()
              .position('bottom right')
              .content('an unexpected error occurred')
              .hideDelay(6000)
          );
        });
    }
  });