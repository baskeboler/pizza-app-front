(function() {
	'use strict';

	angular
		.module('sbAdminApp')
		.directive('tarjetaPedido', ['Pedido', function(Pedido) {
			// Runs during compile
			return {
				// name: '',
				// priority: 1,
				// terminal: true,
				scope: {
					idPedido: '@',
					inverted: '@'
				}, // {} = isolate, true = child, false/undefined = no change
				controller: function($scope, $element, $attrs, $transclude) {
					var vm = this;
					vm.inverted = $scope.inverted;
					vm.showPanel = true;

					Pedido.get($scope.idPedido)
						.then(ok);

					function ok(p) {
						// body...
						vm.pedido = p;
					}
				},
				controllerAs: 'vm',
				// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
				restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
				// template: '',
				templateUrl: 'pedidos/views/directives/timelinePedidos/tarjetaPedido.html',
				replace: true,
				// transclude: true,
				// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
				link: function($scope, iElm, iAttrs, controller) {
					if ($scope.inverted === 'true') {
						iElm.addClass('timeline-inverted');
					}
				}
			};
		}]);
})()