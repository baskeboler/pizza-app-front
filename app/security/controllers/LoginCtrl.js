(function() {
  'use strict'
  /*globals angular:false btoa:false*/
  angular
    .module('sbAdminApp')
    .controller('LoginController', LoginController)

  function LoginController($http, $rootScope, $log, $state, appConfig, Restangular, principal) {
    var vm = this
    vm.username = ''
    vm.password = ''
    vm.login = login
    vm.credentials = {}

    function login() {

      $http.post(appConfig.apiHost + '/authenticate', vm.credentials)
        .success(function(user) {
          $log.debug('got user');
          $log.debug(user);
          /*$rootScope.user = user;
          $rootScope.user.isAuthenticated = true;*/
          principal.authenticate(user);
          $rootScope.userToken = user.token;
          /*$http.defaults.headers.common[appConfig.xAuthTokenHeaderName] = user.token;
           */
          /*
                    var restangularHeader = {};
                    restangularHeader[appConfig.xAuthTokenHeaderName] = user.token;
                    Restangular.setDefaultHeaders(restangularHeader);*/
          if (angular.isDefined($rootScope.returnToState)) {
            $state.go($rootScope.returnToState);
            $rootScope.returnToState = undefined;
          } else {
            $state.go('dashboard.home');
          }

        })
        .error(function() {
          $rootScope.authenticated = false
        })
    }

  }
})()