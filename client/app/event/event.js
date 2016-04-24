'use strict';

angular.module('TripApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('shell.new-event', {
        url: '/new-event',
        templateUrl: 'app/event/new-event/new-event.html',
        controller: 'NewEvent'
      })
      .state('shell.events-history', {
        url: '/events-history',
        templateUrl: 'app/event/events-history/events-history.html',
        controller: 'EventsHistory'
      })
      .state('shell.edit-event', {
        url: '/edit-event/:id',
        templateUrl: 'app/event/edit-event/edit-event.html',
        controller: 'EditEvent',
        resolve: {
          event: function ($events, $stateParams) {
            return $events.getById({id: $stateParams.id}).$promise;
          },
          users: function ($users) {
            return $users.getAll().$promise;
          }
        }
      })
      .state('shell.show-event', {
        url: '/show-event/:id',
        templateUrl: 'app/event/show-event/show-event.html',
        controller: 'ShowEvent',
        resolve: {
          event: function ($events, $stateParams) {
            return $events.getById({id: $stateParams.id}).$promise;
          }
        }
      })
  });