'use strict'

angular.module('TripApp')
  .controller('Shell', function ($scope, $mdDialog) {

    $scope.createNewEvent = function (ev) {
      $mdDialog.show({
        controller: 'NewEvent',
        templateUrl: 'app/event/new-event/new-event.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    };
  });