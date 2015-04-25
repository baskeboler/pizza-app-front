(function () {
  'use strict'
  angular.module('sbAdminApp').factory('loginInterceptor', loginInterceptor)
  function loginInterceptor ($rootScope, $q, $location, $log, appConfig) {
    return {
    	'response': success,
    	'responseError': error,
    	'request': req,
    	'requestError': requestError
    };

    function req(config) {
    	if ($rootScope.user) { 
    		config.headers[appConfig.xAuthTokenHeaderName] = $rootScope.user.token;
    	}
    	return config;
    }

    function requestError (rejection) {
    	$log.debug(rejection);
    	return rejection;
    }

    function success (response) {
      return response
    }
    function error (response) {
      var status = response.status
      var config = response.config
      var method = response.method
      var url = config.url
      if (status === 401 || status === 403) {
        $location.path('/login')
        $log.debug('[interceptor] Error ' + status);
      } else {
        $rootScope.error = method + ' on ' + url + ' failed with status ' + status
        $log.debug($rootScope.error)
      }
      return $q.reject(response)
    }
  }
})();