(function() {
	'use strict';

	angular.module('sbAdminApp')
		.controller('ClienteController', ClienteController);

	ClienteController.$inject = ['Cliente', '$log', '$modal'];

	function ClienteController(Cliente, $log, $modal) {
		var vm = this;
		vm.titulo = 'Cosa de clientes';
		vm.nuevo = {};
		vm.selectedClient = [];
		vm.listaClientes = [];
		vm.suggestedClientes = [];
		vm.search = null;
		vm.updateSuggestions = updateSuggestions;
		vm.clearSelection = clearSelection;
		vm.deleteSelection = deleteSelection;
		vm.crearCliente = crearCliente;
		vm.abrirModalCrearCliente = abrirModalCrearCliente;

		function updateSuggestions() {
			// body...
			if (angular.isString(vm.search)) {
				Cliente.suggest(vm.search)
					.then(ok, error);
			}

			function ok(data) {
				$log.debug(data);
				vm.suggestedClientes = data;
			}

			function error(argument) {
				// body...
			}
		}

		function abrirModalCrearCliente() {
			var modal = $modal.open({
				templateUrl: 'clientes/views/modals/crear-cliente-modal.html',
				controller: 'CrearClienteModalInstanceController',
				controllerAs: 'vm'
			});

			modal.result.then(creado, cancelado);

			function creado(nuevo) {
				$log.debug('[ClienteController] Cliente creado.');
				vm.listaClientes.push(nuevo);
			}

			function cancelado(argument) {
				$log.debug('[ClienteController] Cliente no creado.');
			}
		}

		//vm.clientes = Restangular.all('clientes');
		Cliente.getList()
			.then(function(result) {
				$log.debug(result);
				vm.clientes = result;
				vm.listaClientes = result;
				vm.numClientes = vm.listaClientes.length;
			});


		function clearSelection() {
			// body...
			vm.seleccionado = null;
		}

		function deleteSelection() {
			vm.selectedClient[0].remove()
				.then(function() {

					_.remove(vm.listaClientes, function(argument) {
						return argument === vm.selectedClient[0]
					});
					vm.selectedClient.pop();
				});
		}



		function crearCliente() {
			Cliente.create(vm.nuevo)
				.then(function() {
					vm.listaClientes.push(vm.nuevo);
					vm.nuevo = {};
				});
		}

	}
})();