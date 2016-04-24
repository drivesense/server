'use strict';

angular.module('TripApp')
  .controller('EventsHistory', function ($scope, $events, $mdToast, $mdDialog, Auth, $state) {
    var currentUser = Auth.getCurrentUser()._id;

    function getEvents() {
      $scope.promise = $events.get({id: currentUser}, function(events) {
        $scope.events = events;
      }).$promise;
    };

    $scope.openEvent = function (event) {
      if (event.admin === currentUser) {
        $state.go('shell.edit-event', {id: event._id});
      }
      else {
        $state.go('shell.show-event', {id: event._id});
      }
    };

    getEvents();
  });