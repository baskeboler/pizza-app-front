(function () {
  /*globals angular:false*/
  angular
    .module('sbAdminApp')
    .constant('appConfig', {
      apiHost: 'http://localhost:8080',
      xAuthTokenHeaderName: 'x-auth-token'
    })
})()
