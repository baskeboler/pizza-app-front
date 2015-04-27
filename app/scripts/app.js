(function() {
  'use strict'
  /**
   * @ngdoc overview
   * @name sbAdminApp
   * @description
   * # sbAdminApp
   *
   * Main module of the application.
   */

  /*globals angular:false*/
  angular
    .module('sbAdminApp', [
      'oc.lazyLoad',
      'ui.router',
      'ui.bootstrap',
      'angular-loading-bar',
      'ngGrid',
      'ngSanitize',
      'ui.select',
      'restangular',
      'cgNotify',
      'ngAnimate',
      'ngFx',
      'chart.js',
      'ngCookies'
    ])
    .config(function($httpProvider) {
      $httpProvider.interceptors.push('loginInterceptor');
      //$httpProvider.defaults.headers.common['Accept'] = 'application/json, text/plain, * / *'
      //$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
      //$httpProvider.defaults.withCredentials = true;
      //$httpProvider.defaults.headers.common.JSESSIONID = 
    })
    .config(['RestangularProvider', '$httpProvider', function(RestangularProvider, $httpProvider) {
      RestangularProvider.setBaseUrl('http://localhost:8080/api')
      RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
      /*if (operation === 'post' && response.status === 201) {
        var location = response.headers('Location');
        console.log(data);
        console.log(deferred);
        console.log(response);
        console.log(location);
        response.config.data._links = {
          self: {
            href: location
          }
        };
        deferred.resolve(response);
        //return location;
      }*/
        if (what === 'clientes') {
          if (operation === 'getList') {
            return (data._embedded) ? data._embedded.clientes : []
          }
        }
        if (what === 'bebidas') {
          if (operation === 'getList') {
            return (data._embedded) ? data._embedded.bebidas : []
          }
        }
        if (what === 'platos') {
          if (operation === 'getList') {
            return (data._embedded) ? data._embedded.platos : []
          }
        }
        if (what === 'pedidos') {
          if (operation === 'getList' || operation === 'customGETLIST') {
            return (data._embedded) ? data._embedded.pedidos : []
          }
        }
        if (what === 'search/obtenerPedidosPendientes') {
          if (operation === 'getList') {
            return (data._embedded) ? data._embedded.pedidos : []
          }
        }
      })
      RestangularProvider.setRestangularFields({
          selfLink: '_links.self.href'
        })
        /*RestangularProvider.addFullRequestInterceptor(
          function (element, operation, route, url, headers, params, httpConfig) {
            return {
              headers: $httpProvider.defaults.headers.common
            };
        });*/
    }])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
      $ocLazyLoadProvider.config({
        debug: true,
        events: true,
        modules: [{
          name: 'sbAdminApp',
          reconfig: false,
          files: [
            'scripts/filters/FromNow.js',
            'scripts/directives/header/header.js',
            'scripts/directives/header/header-notification/header-notification.js',
            'scripts/directives/sidebar/sidebar.js',
            'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
            /*,
                       'scripts/services/ApiHost.js',
                       'security/services/Principal.js',
                       'security/services/Authorization.js'*/
          ]
        }, {
          name: 'toggle-switch',
          files: [
            'bower_components/angular-toggle-switch/angular-toggle-switch.min.js',
            'bower_components/angular-toggle-switch/angular-toggle-switch.css'
          ]
        }, {
          name: 'ngAnimate',
          files: ['bower_components/angular-animate/angular-animate.js']
        }, {
          name: 'ngCookies',
          files: ['bower_components/angular-cookies/angular-cookies.js']
        }, {
          name: 'ngResource',
          files: ['bower_components/angular-resource/angular-resource.js']
        }, {
          name: 'ngSanitize',
          files: ['bower_components/angular-sanitize/angular-sanitize.js']
        }, {
          name: 'ngTouch',
          files: ['bower_components/angular-touch/angular-touch.js']
        }, {
          name: 'chart.js',
          files: [
            'bower_components/Chart.js/Chart.min.js',
            'bower_components/angular-chart.js/dist/angular-chart.css',
            'bower_components/angular-chart.js/dist/angular-chart.js'
          ]
        }, {
          name: 'ui.select',
          files: [
            'bower_components/angular-ui-select/dist/select.js',
            'bower_components/angular-ui-select/dist/select.css'
          ]
        }]
      })

      $urlRouterProvider.otherwise('/dashboard/home')

      $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: '/views/dashboard/main.html',
          data: {
            roles: ['ROLE_USER']
          },
          resolve: {
            loadMyDirectives: function($ocLazyLoad) {
              return [
                $ocLazyLoad.load('sbAdminApp'),
                $ocLazyLoad.load('toggle-switch'),
                $ocLazyLoad.load('ngCookies')
              ]
            }
          }
        })
        .state('dashboard.bebidas', {
          url: '/bebidas',
          templateUrl: '/productos/views/bebidas.html',
          controller: 'BebidasController',
          controllerAs: 'vm',
          resolve: {
            loadMyControllers: function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'sbAdminApp',
                files: [
                  'productos/js/controllers/BebidasCtrl.js',
                  'productos/js/services/Bebida.js',
                  'productos/js/controllers/modals/CrearBebidaModalInstanceCtrl.js'
                ]
              })
            }
          }
        })
        .state('dashboard.platos', {
          url: '/platos',
          templateUrl: '/productos/views/platos.html',
          controller: 'PlatosController',
          controllerAs: 'vm',
          resolve: {
            loadMyControllers: function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'sbAdminApp',
                files: [
                  'productos/js/controllers/PlatosCtrl.js',
                  'productos/js/services/Plato.js'
                ]
              })
            }
          }
        })
        .state('dashboard.pedidos', {
          url: '/pedidos',
          abstract: true,
          template: '<ui-view />',
          resolve: {
            load: function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'sbAdminApp',
                files: [
                  'pedidos/js/services/Pedido.js'
                ]
              })
            }
          }
        })
        .state('dashboard.pedidos.list', {
          url: '/list',
          templateUrl: '/pedidos/views/pedidos.list.html',
          controller: 'ListaPedidosController',
          controllerAs: 'vm',
          resolve: {
            load: function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'sbAdminApp',
                files: [
                  'pedidos/js/controllers/ListaPedidosCtrl.js',
                  'pedidos/js/controllers/VerPedidoModalInstanceCtrl.js'
                ]
              })
            }
          }
        })
        .state('dashboard.pedidos.pendientes', {
          url: '/pendientes',
          templateUrl: '/pedidos/views/pedidos.pendientes.html',
          controller: 'ListaPedidosPendientesController',
          controllerAs: 'vm',
          resolve: {
            load: function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'sbAdminApp',
                files: [
                  'pedidos/js/controllers/PedidosPendientesCtrl.js'
                ]
              })
            }
          }
        })
        .state('dashboard.pedidos.create', {
          url: '/create',
          templateUrl: '/pedidos/views/pedidos.create.html',
          controller: 'PedidosController',
          controllerAs: 'vm',
          resolve: {
            loadMyControllers: function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'sbAdminApp',
                files: [
                  'pedidos/js/controllers/PedidosCtrl.js',
                  'clientes/js/controllers/CrearClienteModalInstanceCtrl.js',
                  'clientes/js/services/Cliente.js',
                  'productos/js/services/Bebida.js',
                  'productos/js/services/Plato.js'
                ]
              })
            }
          }
        })
        .state('dashboard.home', {
          url: '/home',
          controller: 'MainCtrl',
          templateUrl: '/views/dashboard/home.html',
          resolve: {
            loadMyFiles: function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'sbAdminApp',
                files: [
                  'scripts/controllers/main.js',
                  'scripts/directives/timeline/timeline.js',
                  'scripts/directives/notifications/notifications.js',
                  'scripts/directives/chat/chat.js',
                  'scripts/directives/dashboard/stats/stats.js'
                ]
              })
            }
          }
        })
        .state('dashboard.clientes', {
          templateUrl: 'clientes/views/main.html',
          controller: 'ClienteController',
          controllerAs: 'vm',
          url: '/clientes',
          resolve: {
            loadMyControllers: function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'sbAdminApp',
                files: [
                  'clientes/js/controllers/ClienteCtrl.js',
                  'clientes/js/services/Cliente.js',
                  'clientes/js/controllers/CrearClienteModalInstanceCtrl.js'
                ]
              })
            }
          }
        })
        .state('dashboard.form', {
          templateUrl: '/views/form.html',
          url: '/form'
        })
        .state('dashboard.blank', {
          templateUrl: '/views/pages/blank.html',
          url: '/blank'
        })
        .state('login', {
          templateUrl: '/views/pages/login.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          url: '/login',
          resolve: {
            load: function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'sbAdminApp',
                files: [
                  /*'security/services/Authorization.js',
                  'security/services/Principal.js',
                  'scripts/services/ApiHost.js',*/
                  'security/controllers/LoginCtrl.js'
                ]
              })
            }
          }
        })
        .state('login.accessdenied', {
          templateUrl: '/views/pages/login.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          url: '/accessdenied',
          data: {
            msg: 'Access Denied'
          },
          resolve: {
            load: function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'sbAdminApp',
                files: [
                  /*'security/services/Authorization.js',
                  'security/services/Principal.js',
                  'scripts/services/ApiHost.js',*/
                  'security/controllers/LoginCtrl.js'
                ]
              })
            }
          }
        })
        .state('dashboard.chart', {
          templateUrl: 'views/chart.html',
          url: '/chart',
          controller: 'ChartCtrl',
          resolve: {
            loadMyFiles: function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'sbAdminApp',
                files: ['scripts/controllers/chartContoller.js']
              })
            }
          }
        })
        .state('dashboard.table', {
          templateUrl: 'views/table.html',
          url: '/table'
        })
        .state('dashboard.panels-wells', {
          templateUrl: 'views/ui-elements/panels-wells.html',
          url: '/panels-wells'
        })
        .state('dashboard.buttons', {
          templateUrl: 'views/ui-elements/buttons.html',
          url: '/buttons'
        })
        .state('dashboard.notifications', {
          templateUrl: 'views/ui-elements/notifications.html',
          url: '/notifications'
        })
        .state('dashboard.typography', {
          templateUrl: 'views/ui-elements/typography.html',
          url: '/typography'
        })
        .state('dashboard.icons', {
          templateUrl: 'views/ui-elements/icons.html',
          url: '/icons'
        })
        .state('dashboard.grid', {
          templateUrl: 'views/ui-elements/grid.html',
          url: '/grid'
        })
    }])
    .run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal',
      function($rootScope, $state, $stateParams, authorization, principal) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
          // track the state the user wants to go to; authorization service needs this
          $rootScope.toState = toState
          $rootScope.toStateParams = toStateParams
            // if the principal is resolved, do an authorization check immediately. otherwise,
            // it'll be done when the state it resolved.
          if (principal.isIdentityResolved()) {
            authorization.authorize()
          }
        })
      }
    ])
    .run(function($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    });
})();