'use strict';

angular.module('drivesenseApp')
  .factory('Auth', function Auth($location, $rootScope, $http, $users, $cookieStore, $q) {
    var currentUser = {};

    if ($cookieStore.get('token')) {
      currentUser = $users.me();
    }

    return {
      login: function (user) {
        return $http.post('/auth/local', {
            email: user.email,
            password: user.password
          })
          .then(function (data) {
            $cookieStore.put('token', data.data.token);
            currentUser = $users.me();
          })
          .catch(function () {
            this.logout();
          }.bind(this));
      },

      logout: function () {
        $cookieStore.remove('token');
        currentUser = {};
      },

      createUser: function (user) {
        return $users.save(user,
          function (data) {
            $cookieStore.put('token', data.token);
            currentUser = $users.me();
          },
          function () {
            this.logout();
          }.bind(this)).$promise;
      },

      changePassword: function (oldPassword, newPassword) {
        return $users.changePassword({id: currentUser._id}, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }).$promise;
      },

      getCurrentUser: function () {
        return currentUser;
      },

      isLoggedIn: function () {
        return currentUser.hasOwnProperty('_id');
      },

      isLoggedInAsync: function (cb) {
        if (currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function () {
            cb(true);
          }).catch(function () {
            cb(false);
          });
        } else {
          cb(currentUser.hasOwnProperty('_id'));
        }
      },

      getToken: function () {
        return $cookieStore.get('token');
      },

      hasRole: function (role) {
        if (!currentUser) {
          return false;
        }

        return (role === 'manager' && currentUser.type === 'teacher' && currentUser.manager) || role === currentUser.type;
      }
    };
  });
