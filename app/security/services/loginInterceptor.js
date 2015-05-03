(function() {
  'use strict'
  angular.module('sbAdminApp')
    .factory('loginInterceptor', loginInterceptor)

  function loginInterceptor($cookies, $rootScope, $q, $location, $log, appConfig) {
    return {
      'response': success,
      'responseError': error,
      'request': req,
      'requestError': requestError
    };

    function req(config) {
      //$http.defaults.headers.common[appConfig.xAuthTokenHeaderName] = identity.token;
      var token = $rootScope.userToken;
      if (token) {
        config.headers[appConfig.xAuthTokenHeaderName] = token;
      }
      return config;
    }

    function requestError(rejection) {
      $log.debug(rejection);
      return rejection;
    }

    function success(response) {
      return response
    }

    function error(response) {
      var status = response.status
      var config = response.config
      var method = response.method
      var url = (config) ? config.url : '';
      if (status === 401 || status === 403) {
        //$rootScope.toState = $rootScope.$state;
        //$rootScope.toStateParams = $rootScope.$stateParams;
        $location.path('/login');
        $log.debug('[interceptor] Error ' + status);
      } else {
        $rootScope.error = method + ' on ' + url + ' failed with status ' + status
        $log.debug($rootScope.error)
      }
      return $q.reject(response)
    }
  }
})();