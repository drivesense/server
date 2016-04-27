'use strict';

angular.module('drivesenseApp')
  .directive('drivesenseMap', function ($timeout) {
    return {
      restrict: 'E',
      templateUrl: 'components/map/map.html',
      replace: true,
      scope: {
        api: '='
      },
      link: function (scope, element) {
        scope.api = {};
        scope.map = {
          center: {
            latitude: 32,
            longitude: 35
          },
          zoom: 16,
          location: null,
          markers: [],
          control: {},
          options: {
            scrollwheel: true
          }
        };

        scope.getCurrentLocation = function () {
          var options = {
            enableHighAccuracy: true
          };

          navigator.geolocation.getCurrentPosition(function (position) {
              $timeout(function () {
                // var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
                scope.map.center.latitude = position.coords.latitude;
                scope.map.center.longitude = position.coords.longitude;
                scope.map.location = {
                  coords: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                  }
                };
              });
            },
            function (error) {
              alert('Unable to get location: ' + error.message);
            }, options);
        };

        scope.getCurrentLocation();
      }
    };
  });
