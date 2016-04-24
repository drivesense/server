'use strict';

angular.module('drivesenseApp')
  .service('$users', function ($resource) {
    return $resource('/api/users/:id/:controller', {id: '@_id'},
      {
        changePassword: {
          method: 'PUT',
          params: {
            controller: 'password'
          }
        },

        forgotPassword: {
          method: 'POST',
          params: {
            id: 'forgotPassword'
          }
        },

        resetPassword: {
          method: 'POST',
          params: {
            id: 'resetPassword'
          }
        },

        validate: {
          method: 'POST',
          params: {
            id: 'validate'
          }
        },

        revalidate: {
          method: 'POST',
          params: {
            controller: 'revalidate'
          }
        },

        get: {
          method: 'GET',
          params: {
            id: 'me'
          }
        },

        getAll: {
          method: 'GET'
        },

        update: {
          method: 'PUT'
        },

        changeAdmin: {
          method: 'POST',
          params: {
            controller: 'changeAdmin'
          }
        },

        addRole: {
          method: 'POST',
          params: {
            controller: 'addRole'
          }
        },

        removeRole: {
          method: 'POST',
          params: {
            controller: 'removeRole'
          }
        }
      });
  });