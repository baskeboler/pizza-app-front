(function() {
	'use strict';

	angular.module('sbAdminApp')
		.controller('CrearBebidaModalInstanceController', CrearBebidaModalInstanceController);

	function CrearBebidaModalInstanceController($modalInstance, Bebida, $log) {
		var vm = this;
		vm.nueva = {};
		vm.crearBebida = crearBebida;
		vm.cancelar = cancelar;

		function crearBebida() {
			// body...
			Bebida.create(vm.nueva)
				.then(ok, error);

			function ok(response) {
				$log.debug('[CrearBebidaModalInstanceController] response received.');
				$log.debug(response);
				$modalInstance.close('ok');
			}

			function error(argument) {
				// body...
			}
		}

		function cancelar() {
			// body...
		}
	}
})();