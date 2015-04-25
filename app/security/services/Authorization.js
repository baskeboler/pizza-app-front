(function () {
  'use strict'

  /*globals angular:false*/
  angular
    .module('sbAdminApp')
    .factory('authorization', authorization)

  function authorization ($rootScope, $state, principal) {
    // body...
    return {
      authorize: authorize
    }
    function authorize () {
      return principal.identity()
        .then(validateIdentity)

      function validateIdentity () {
        var isAuthenticated = principal.isAuthenticated()
        if ($rootScope.user.roles
          && $rootScope.user.roles.length > 0
          && !principal.isInAnyRole($rootScope.user.roles)) {
          if (isAuthenticated) {
            $state.go('login.accessdenied')
          } else {
            $state.go('login')
          }
        }
      }
    }
  }
})()
