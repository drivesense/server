'use strict';

angular.module('TripApp')
  .controller('SideMenu', function ($scope, $rootScope, $state, $mdSidenav, $mdDialog, Auth) {
    $scope.logout = function () {
      Auth.logout();
      $state.go('exterior.login');
    };

    $scope.loggedInUser = Auth.getCurrentUser();

    $scope.navList = [
      {
        text: 'home',
        state: 'shell.home',
        'iconClass': 'mdi mdi-home mdi-24px'
      }, {
        text: 'my events',
        state: 'shell.events-history',
        'iconClass': 'mdi mdi-format-list-bulleted mdi-24px'
      }, {
        text: 'settings',
        state: 'shell.user-settings',
        'iconClass': 'mdi mdi-settings'
      }
    ];

    $scope.navList = _.filter($scope.navList, function (item) {
      var permissions = ($state.get(item.state).data || {}).requiredPermissions;
      return permissions ? Auth.hasPermissions(permissions) : true;
    });

    $scope.toggleMenu = function () {
      $mdSidenav('sideNav').toggle();
    }
  });
