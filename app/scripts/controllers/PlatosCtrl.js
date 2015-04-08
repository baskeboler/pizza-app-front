(function() {
	'use strict';

	angular.module("sbAdminApp").controller('PlatosController', PlatosCtrl);

	PlatosCtrl.$inject = ['Restangular', '$log'];

	function PlatosCtrl(Restangular, $log) {
		var vm = this;
		vm.title = 'Platos';
		vm.nueva = {};
		vm.listaPlatos = [];
		vm.errors = [];
		vm.crearPlato = crearNuevoPlato;
		vm.cargarLista = cargarListaPlatos;
		vm.dismissError = dismissError;
		vm.clearForm = clearForm;
		vm.remove = removePlato;

		vm.platos = Restangular.all('platos');
		vm.cargarLista();

		function crearNuevoPlato () {
			vm.platos.post(vm.nueva).then(ok, showErrors);

			function ok () {
				vm.listaPlatos.push(vm.nueva);
				vm.clearForm();
			}
		}

		function removePlato (plato) {
			plato.remove().then(ok, showErrors);

			function ok () {
				_.remove(vm.listaPlatos, function(b) {
					return b === plato;
				});
			}
		}

		function dismissError (error) {
			_.remove(vm.errors, function(e) {
				return e === error;
			});
		}

		function cargarListaPlatos () {
			vm.platos.getList().then(fillData, showErrors);

			function fillData (data) {
				vm.listaPlatos = data;
			}

		}
		
		function showErrors (response) {
			$log.debug('there was an error');
			vm.errors.push(response);
		}

		function clearForm () {
			vm.nueva = {};
		}

	}
})();