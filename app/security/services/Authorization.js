(function() {
  'use strict'

  /*globals angular:false*/
  angular
    .module('sbAdminApp')
    .factory('authorization', authorization)

  function authorization($rootScope, $state, $location, principal) {
    // body...
    return {
      authorize: authorize
    };

    function authorize() {
      return principal.identity()
        .then(validateIdentity);

      function validateIdentity() {
        var isAuthenticated = principal.isAuthenticated()
        var data = $state.current.data;
        if (angular.isDefined(data) && angular.isArray(data.roles) && !principal.isInAnyRole($state.current.data.roles)) {
          if (isAuthenticated) {
            $location.path = '/accessdenied';
          } else {
            /*$state.go('login')*/
            $rootScope.returnToState = $rootScope.toState;
            $rootScope.returnToStateParams = $rootScope.toStateParams;
            $state.go('login');
          }
        }
      }
    }
  }
})()