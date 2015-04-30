(function() {
	'use strict';

	angular.module('sbAdminApp')
		.controller('CrearPlatoModalInstanceController', CrearPlatoModalInstanceController);

	function CrearPlatoModalInstanceController($modalInstance, Plato, $log) {
		var vm = this;
		vm.nueva = {};
		vm.crearPlato = crearPlato;
		vm.cancelar = cancelar;

		function crearPlato() {
			// body...
			Plato.create(vm.nueva)
				.then(ok, error);

			function ok(response) {
				$log.debug('[CrearPlatoModalInstanceController] response received.');
				$log.debug(response);
				$modalInstance.close('ok');
			}

			function error(argument) {
				// body...
			}
		}

		function cancelar() {
			// body...
			$modalInstance.dismiss('cancelar');
		}
	}
})();