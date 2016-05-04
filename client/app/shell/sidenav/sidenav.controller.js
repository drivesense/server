'use strict';

angular.module('drivesenseApp')
  .controller('SideMenu', function ($scope, $rootScope, $mdSidenav, $mdDialog, Auth, $state) {
    $scope.logout = function () {
      Auth.logout();
    };

    $scope.loggedInUser = Auth.getCurrentUser();

    var navList = [{
      text: 'Home',
      state: 'shell.home',
      iconClass: 'home'
    },{
      text: 'Agenda',
      state: 'shell.agenda-teacher',
      iconClass: 'calendar'
    }, {
      text: 'Students',
      state: 'shell.students',
      iconClass: 'account-multiple'
    }, {
      text: 'Schools',
      state: 'shell.schools',
      iconClass: 'settings'
    }, {
      text: 'Managers',
      state: 'shell.managers',
      iconClass: 'settings'
    }, {
      text: 'Teachers',
      state: 'shell.teachers',
      iconClass: 'settings'
    }, {
      text: 'Profile',
      state: 'shell.profile',
      iconClass: 'account'
    }];

    $scope.navList = _.filter(navList, function (item) {
      var role = ($state.get(item.state).data || {}).requiredRole;
      return role ? Auth.hasRole(role) : true;
    });

    $scope.toggleMenu = function () {
      $mdSidenav('sideNav').toggle();
    }
  });
