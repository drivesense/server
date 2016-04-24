'use strict';

angular.module('drivesenseApp')
  .controller('SideMenu', function ($scope, $rootScope, $state, $mdSidenav, $mdDialog, Auth) {
    $scope.logout = function () {
      Auth.logout();
      $state.go('exterior.login');
    };

    $scope.loggedInUser = Auth.getCurrentUser();

    var navList = [{
      text: 'Home',
      state: 'shell.home',
      iconClass: 'mdi mdi-home mdi-24px'
    },{
      text: 'agenda',
      state: 'shell.agenda',
      iconClass: 'mdi mdi-calendar mdi-24px'
    }, {
      text: 'Schools',
      state: 'shell.schools',
      iconClass: 'mdi mdi-settings mdi-24px'
    }, {
      text: 'Managers',
      state: 'shell.managers',
      iconClass: 'mdi mdi-settings mdi-24px'
    }, {
      text: 'Teachers',
      state: 'shell.teachers',
      iconClass: 'mdi mdi-settings mdi-24px'
    }, {
      text: 'Profile',
      state: 'shell.profile',
      iconClass: 'mdi mdi-settings mdi-24px'
    }];

    $scope.navList = _.filter(navList, function (item) {
      var role = ($state.get(item.state).data || {}).requiredRole;
      return role ? Auth.hasRole(role) : true;
    });

    $scope.toggleMenu = function () {
      $mdSidenav('sideNav').toggle();
    }
  });
