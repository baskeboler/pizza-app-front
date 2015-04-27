(function() {
	'use strict';

	angular.module('sbAdminApp')
		.controller('ClienteController', ClienteController);

	ClienteController.$inject = ['Cliente', '$log', '$modal'];

	function ClienteController(Cliente, $log, $modal) {
		var vm = this;
		vm.titulo = 'Cosa de clientes';
		vm.nuevo = { };
		vm.selectedClient = [];
		vm.listaClientes = [];
		vm.clearSelection = clearSelection;
		vm.deleteSelection = deleteSelection;
		vm.crearCliente = crearCliente;
		vm.abrirModalCrearCliente = abrirModalCrearCliente;

		function abrirModalCrearCliente () {
			var modal = $modal.open({
				templateUrl: 'clientes/views/modals/crear-cliente-modal.html',
				controller: 'CrearClienteModalInstanceController',
				controllerAs: 'vm'
			});

			modal.result.then(creado, cancelado);
			function creado (nuevo) {
				$log.debug('[ClienteController] Cliente creado.');
				vm.listaClientes.push(nuevo);
			}
			function cancelado (argument) {
				$log.debug('[ClienteController] Cliente no creado.');
			}
		}
		vm.gOpts = {
			columnDefs: [{
				field: 'nombre',
				displayName: 'Nombre'
			}, {
				field: 'email',
				displayName: 'E-mail'
			}, {
				field: 'telefono',
				displayName: 'Telefono'
			}, {
				field: 'direccion',
				displayName: 'Direccion'
			}],
			data: 'vm.listaClientes',
			jqueryUITheme: true,
			selectedItems: vm.selectedClient,
			multiSelect: false,
			showFilter: true,
			enableSorting: true
		};
		
		//vm.clientes = Restangular.all('clientes');
		Cliente.getList().then(function(result) {
			$log.debug(result);
			vm.clientes = result;
			vm.listaClientes = result;
			vm.numClientes = vm.listaClientes.length;
		});


		function clearSelection() {
			// body...
			vm.selectedClient.pop();
		}

		function deleteSelection() {
			vm.selectedClient[0].remove().then(function() {

				_.remove(vm.listaClientes, function(argument) {
					return argument === vm.selectedClient[0]
				});
				vm.selectedClient.pop();
			});
		}



		function crearCliente() {
			Cliente.create(vm.nuevo).then(function() {
				vm.listaClientes.push(vm.nuevo);
				vm.nuevo = {};
			});
		}

	}
})();