(function() {
	'use strict';

	angular.module("sbAdminApp")
		.controller('PlatosController', PlatosCtrl);

	PlatosCtrl.$inject = ['Plato', '$log', '$timeout', '$modal', 'notify'];

	function PlatosCtrl(Plato, $log, $timeout, $modal, notify) {
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
		vm.abrirModalCrearPlato = abrirModalCrearPlato;

		$timeout(vm.cargarLista, 1000);

		function abrirModalCrearPlato() {
			var modal = $modal.open({
				templateUrl: 'productos/views/modals/crear-plato-modal.html',
				controller: 'CrearPlatoModalInstanceController',
				controllerAs: 'vm'
			});

			modal.result.then(ok, cancelar);

			function ok(argument) {
				// body...
				notify('Plato creado');
				cargarListaPlatos();

			}

			function cancelar(argument) {
				// body...
			}
		}

		function crearNuevoPlato() {
			Plato.create(vm.nueva)
				.then(ok, showErrors);

			function ok() {
				vm.listaPlatos.push(vm.nueva);
				vm.clearForm();
			}
		}

		function removePlato(plato) {
			plato.remove()
				.then(ok, showErrors);

			function ok() {
				_.remove(vm.listaPlatos, function(b) {
					return b === plato;
				});
			}
		}

		function dismissError(error) {
			_.remove(vm.errors, function(e) {
				return e === error;
			});
		}

		function cargarListaPlatos() {
			Plato.getList()
				.then(fillData, showErrors);

			function fillData(data) {
				vm.listaPlatos = data;
			}

		}

		function showErrors(response) {
			$log.debug('there was an error');
			vm.errors.push(response);
		}

		function clearForm() {
			vm.nueva = {};
		}

	}
})();