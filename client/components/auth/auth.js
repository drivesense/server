'use strict';

angular.module('TripApp')
  .factory('Auth', function Auth($location, $rootScope, $http, $users, $cookieStore, $q) {
    var currentUser = {};
    if ($cookieStore.get('token')) {
      currentUser = $users.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function (user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('/auth/local', {
          email: user.email,
          password: user.password
        }).
          success(function (data) {
            $cookieStore.put('token', data.token);
            currentUser = $users.get();
            deferred.resolve(data);
            return cb();
          }).
          error(function (err) {
            this.logout();
            deferred.reject(err);
            return cb(err);
          }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function () {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Create a new user
       *
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      createUser: function (user, callback) {
        var cb = callback || angular.noop;

        return $users.save(user,
          function (data) {
            $cookieStore.put('token', data.token);
            currentUser = $users.get();
            return cb(user);
          },
          function (err) {
            this.logout();
            return cb(err);
          }.bind(this)).$promise;
      },

      /**
       * Change password
       *
       * @param  {String}   oldPassword
       * @param  {String}   newPassword
       * @param  {Function} callback    - optional
       * @return {Promise}
       */
      changePassword: function (oldPassword, newPassword, callback) {
        var cb = callback || angular.noop;

        return $users.changePassword({id: currentUser._id}, {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, function (user) {
          return cb(user);
        }, function (err) {
          return cb(err);
        }).$promise;
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function () {
        return currentUser;
      },

      /**
       * Refresh all available info on authenticated user
       *
       * @return {Promise}
       */
      refreshCurrentUser: function () {
        if (currentUser) {
          return $users.get()
            .$promise
            .then(function (user) {
              return _.assign(currentUser, user);
            });
        }

        return $q.reject('No user to refresh');
      },

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function () {
        return currentUser.hasOwnProperty('_id');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
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

      /**
       * Get auth token
       */
      getToken: function () {
        return $cookieStore.get('token');
      },

      hasPermissions: function (permissions) {
        if (!currentUser) {
          return false;
        }
        if(permissions === 'admin')
          return currentUser.admin;
      },

      /**
       * Disconnect social provider
       *
       * @param {String} provider
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      disconnectSocial: function (provider, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();
        // TODO: update local user info

        // TODO: why the fuck do we log out on error
        $http.post('/auth/' + provider + '/disconnect').
          success(function () {
            deferred.resolve();
            return cb();
          }).
          error(function (err) {
            this.logout();
            deferred.reject(err);
            return cb(err);
          }.bind(this));

        return deferred.promise;
      }
    };
  });
