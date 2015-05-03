(function() {
	'use strict';

	angular.module('sbAdminApp')
		.controller('VerClienteModalInstanceController', VerClienteModalInstanceController);

	function VerClienteModalInstanceController($modalInstance, cliente) {
		var vm = this;

		vm.cliente = cliente;
		vm.volver = volver;

		function volver() {
			$modalInstance.close('volver');
		}
	}
})();