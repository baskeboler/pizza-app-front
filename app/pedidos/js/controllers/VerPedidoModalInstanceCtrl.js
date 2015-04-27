(function() {
	'use strict';

	angular.module('sbAdminApp')
		.controller('VerPedidoModalInstanceController', VerPedidoModalInstanceController);

	function VerPedidoModalInstanceController ($modalInstance, $log, pedido) {
		var vm = this;
		vm.pedido = pedido;
		vm.ok = ok;

		function ok () {
			$modalInstance.dismiss('salir');
		}
	}
})();