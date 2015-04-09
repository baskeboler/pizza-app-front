(function() {
  'use strict';

  /**
   * @ngdoc directive
   * @name izzyposWebApp.directive:adminPosHeader
   * @description
   * # adminPosHeader
   */

  angular.module('sbAdminApp')
    .directive('sidebar', ['$location', function() {
      return {
        templateUrl: 'scripts/directives/sidebar/sidebar.html',
        restrict: 'E',
        replace: true,
        controller: function($scope, $log) {
          $scope.selectedMenu = 'dashboard';
          $scope.collapseVar = 0;
          $scope.multiCollapseVar = 0;
          $scope.multiCollapseVar2 = 0
          $log.debug('inside sidebar controller');

          $scope.check = function(x) {
            $log.debug('check() called for ', x);
            if (x === $scope.collapseVar) {
              $scope.collapseVar = 0;
            } else {
              $scope.collapseVar = x;
            }
          };

          $scope.multiCheck = function(y) {

            if (y === $scope.multiCollapseVar) {
              $scope.multiCollapseVar = 0;
            } else {
              $scope.multiCollapseVar = y;
            }
          };

          $scope.multiCheck2 = function(y) {

            if (y === $scope.multiCollapseVar2) {
              $scope.multiCollapseVar2 = 0;
            } else {
              $scope.multiCollapseVar2 = y;
            }
          };
        }
      };
    }]);
})();