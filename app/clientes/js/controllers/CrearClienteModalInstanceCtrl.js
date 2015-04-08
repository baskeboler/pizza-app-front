(function() {
	'use strict';
	angular
		.module('sbAdminApp')
		.controller('CrearClienteModalInstanceController', CrearClienteModalInstanceController);

	CrearClienteModalInstanceController.$inject = ['$modalInstance', '$log', 'Cliente', 'notify'];
	function CrearClienteModalInstanceController ($modalInstance, $log, Cliente, notify) {
		var vm = this;
		vm.nuevo = {};

		vm.crearCliente = crearCliente;
		vm.cancelar = cancelar;

		function crearCliente () {
			// body...
			Cliente.create(vm.nuevo).then(ok, handleError);

			function ok (argument) {
				// body...
				$modalInstance.close(vm.nuevo);
			}

			function handleError (res) {
				notify('Ocurrio un error');
			}
		}

		function cancelar (argument) {
			$modalInstance.dismiss('cancelar');
		}

	}
})();