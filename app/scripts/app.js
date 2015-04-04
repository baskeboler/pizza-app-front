(function() {
  'use strict';
  /**
   * @ngdoc overview
   * @name sbAdminApp
   * @description
   * # sbAdminApp
   *
   * Main module of the application.
   */
  angular
    .module('sbAdminApp', [
      'oc.lazyLoad',
      'ui.router',
      'ui.bootstrap',
      'angular-loading-bar',
      'ngLodash',
      'ngGrid'
    ])
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

      $ocLazyLoadProvider.config({
        debug: true,
        events: true,
        modules: [{
            name: 'sbAdminApp',
            reconfig: false,
            files: [
              'scripts/directives/header/header.js',
              'scripts/directives/header/header-notification/header-notification.js',
              'scripts/directives/sidebar/sidebar.js',
              'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
            ]
          }, {
            name: 'toggle-switch',
            files: [
              "bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
              "bower_components/angular-toggle-switch/angular-toggle-switch.css"
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
            serie: true,
            files: [
              'bower_components/Chart.js/Chart.min.js',
              'bower_components/angular-chart.js/dist/angular-chart.js',
              'bower_components/angular-chart.js/dist/angular-chart.css'
            ]
          }


        ]
      });

      $urlRouterProvider.otherwise('/dashboard/home');

      $stateProvider
        .state('dashboard', {
          url: '/dashboard',
          templateUrl: '/views/dashboard/main.html',
          resolve: {
            loadMyDirectives: function($ocLazyLoad) {
              return $ocLazyLoad.load('sbAdminApp'),
                $ocLazyLoad.load('toggle-switch'),
                $ocLazyLoad.load('ngAnimate'),
                $ocLazyLoad.load('ngCookies'),
                $ocLazyLoad.load('ngResource'),
                $ocLazyLoad.load('ngSanitize'),
                $ocLazyLoad.load('ngTouch');
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
              });
            }
          }
        })
        .state('dashboard.clientes', {
          templateUrl: '/views/clientes/main.html',
          controller: 'ClienteController',
          url: '/clientes',
          resolve: {
            loadMyControllers: function($ocLazyLoad) {
              return $ocLazyLoad.load({
                name: 'sbAdminApp',
                files: ['scripts/controllers/ClienteCtrl.js']
              });
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
          url: '/login'
        })
        .state('dashboard.chart', {
          templateUrl: 'views/chart.html',
          url: '/chart',
          controller: 'ChartCtrl',
          resolve: {
            loadMyFiles: function($ocLazyLoad) {
              return $ocLazyLoad.load('chart.js'), 
                $ocLazyLoad.load({
                  name: 'sbAdminApp',
                  files: ['scripts/controllers/chartContoller.js']
                }
              );
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
        });
    }]);
})();