(function() {
	'use strict';

	angular.module('sbAdminApp')
		.controller('ClienteController', ClienteController);

	ClienteController.$inject = ['Cliente', '$log', '$modal', '$timeout', 'ConfirmDialog'];

	function ClienteController(Cliente, $log, $modal, $timeout, ConfirmDialog) {
		var vm = this;
		vm.titulo = 'Cosa de clientes';
		vm.nuevo = {};
		vm.selectedClient = [];
		vm.listaClientes = [];
		vm.suggestedClientes = [];
		vm.search = null;
		vm.page = null;
		vm.currentPage = 1;
		vm.pageChanged = pageChanged;
		vm.updateSuggestions = updateSuggestions;
		vm.clearSelection = clearSelection;
		vm.deleteSelection = deleteSelection;
		vm.crearCliente = crearCliente;
		vm.abrirModalCrearCliente = abrirModalCrearCliente;
		vm.abrirModalVerCliente = abrirModalVerCliente;
		vm.onRightClick = onRightClick;
		vm.onCloseMenu = onCloseMenu;

		function onCloseMenu(argument) {
			// body...
			$log.debug(argument);
		}

		function onRightClick(argument) {
			// body...
			$log.debug(argument);
		}

		function pageChanged() {
			vm.listaClientes = null;
			vm.clientes = null;
			$timeout(cargarClientes, 500);
		}

		function abrirModalVerCliente(argument) {
			// body...
			var m = $modal.open({
				templateUrl: 'clientes/views/modals/ver-cliente-modal.html',
				controller: 'VerClienteModalInstanceController',
				controllerAs: 'vm'
			});

		}

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


		function cargarClientes() {
			//vm.clientes = Restangular.all('clientes');
			Cliente.getList({
					page: vm.currentPage - 1,
					size: 10
				})
				.then(function(result) {
					$log.debug(result);
					vm.clientes = result;
					vm.listaClientes = result;
					vm.numClientes = vm.listaClientes.length;
					vm.page = result.page;
					if (vm.page) {
						vm.currentPage = vm.page.number + 1;
					}
				});
			// body...
		}
		$timeout(cargarClientes, 1000);


		function clearSelection() {
			// body...
			vm.seleccionado = null;
		}

		function deleteSelection() {
			var modal = ConfirmDialog.confirm('Borrar Cliente', 'Estas seguro de borrar el cliente?');
			modal.result.then(ok, cancelar);

			function ok() {
				// body...
				vm.seleccionado.remove()
					.then(function() {

						_.remove(vm.listaClientes, function(argument) {
							return argument === vm.seleccionado;
						});
						vm.seleccionado = null;
					});
				$log.debug('[ClienteController] eliminando cliente.')
			}

			function cancelar() {
				$log.debug('[ClienteController] no se borra el cliente.')
			}
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