(function () {
  'use strict'
  /*globals angular:false*/
  angular
    .module('sbAdminApp')
    .factory('principal', principal)

  function principal ($q, $http, $timeout, appConfig) {
    var _identity, _authenticated = false

    return {
      isIdentityResolved: isIdentityResolved,
      isAuthenticated: isAuthenticated,
      isInRole: isInRole,
      isInAnyRole: isInAnyRole,
      authenticate: authenticate,
      identity: identity
    }

    function isIdentityResolved () {
      return angular.isDefined(_identity)
    }
    function isAuthenticated () {
      return _authenticated
    }

    function isInRole (role) {
      if (!_authenticated || !_identity.roles) {
        return false
      }
      return _identity.roles[role];
    }

    function isInAnyRole (roles) {
      if (!_authenticated || !_identity.roles) {
        return false
      }
      for (var i = 0; i < roles.length; i++) {
        if (isInRole(roles[i])) {
          return true
        }
      }
      return false
    }

    function authenticate (identity) {
      _identity = identity
      _authenticated = identity !== null
    }

    function identity (force) {
      var deferred = $q.defer()
      if (force) {
        _identity = undefined
      }
      // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
      if (angular.isDefined(_identity)) {
        deferred.resolve(_identity)

        return deferred.promise
      }

      /*jslint validthis:true*/
      $http.get(appConfig.apiHost + '/api/identity', {ignoreErrors: true})
        .success(function (data) {
          _identity = data
          _authenticated = true
          deferred.resolve(_identity)
        }).error(function () {
        _identity = null
        _authenticated = false
        deferred.resolve(_identity)
      })

      return deferred.promise
    }
  }
})()
