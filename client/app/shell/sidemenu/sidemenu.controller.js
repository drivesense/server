'use strict';

angular.module('drivesenseApp')
  .controller('SideMenu', function ($scope, $rootScope, $state, $mdSidenav, $mdDialog, Auth) {
    $scope.logout = function () {
      Auth.logout();
      $state.go('exterior.login');
    };

    $scope.loggedInUser = Auth.getCurrentUser();

    $scope.navList = [{
      text: 'Home',
      state: 'shell.home',
      iconClass: 'mdi mdi-home mdi-24px'
    }, {
      text: 'Schools',
      state: 'shell.schools',
      iconClass: 'mdi mdi-settings'
    }, {
      text: 'Managers',
      state: 'shell.managers',
      iconClass: 'mdi mdi-settings'
    }, {
      text: 'Teachers',
      state: 'shell.teachers',
      iconClass: 'mdi mdi-settings'
    }, {
      text: 'Settings',
      state: 'shell.user-settings',
      iconClass: 'mdi mdi-settings'
    }];

    $scope.navList = _.filter($scope.navList, function (item) {
      var permissions = ($state.get(item.state).data || {}).requiredPermissions;
      return permissions ? Auth.hasPermissions(permissions) : true;
    });

    $scope.toggleMenu = function () {
      $mdSidenav('sideNav').toggle();
    }
  });