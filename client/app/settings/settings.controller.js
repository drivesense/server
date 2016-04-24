'use strict';

angular.module('TripApp')
  .controller('SettingsCtrl', function ($scope, $mdDialog) {
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.selectedIndex = 0;
    $scope.selectIndex = function (index) {
      $scope.selectedIndex = index;
    };

    $scope.listItems = [
      {
        text: 'user info',
        link: 'app/settings/user-details/user-details.html',
        'iconClass': 'mdi mdi-account'
      },
      {
        text: 'change password',
        link: 'app/settings/change-password/change-password.html',
        'iconClass': 'mdi mdi-key'
      }
    ];

  });
