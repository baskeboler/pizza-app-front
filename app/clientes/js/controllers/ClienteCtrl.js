(function() {
	'use strict';

	angular.module('sbAdminApp')
		.controller('ClienteController', ClienteController);

	ClienteController.$inject = ['Cliente', '$log'];

	function ClienteController(Cliente, $log) {
		var vm = this;
		vm.titulo = 'Cosa de clientes';
		vm.nuevo = { };
		vm.selectedClient = [];
		vm.listaClientes = [];

		vm.gOpts = {
			columnDefs: [{
				field: 'nombre',
				displayName: 'Nombre'
			}, {
				field: 'email',
				displayName: 'E-mail'
			}],
			data: 'vm.listaClientes',
			jqueryUITheme: true,
			selectedItems: vm.selectedClient,
			multiSelect: false
		};
		
		vm.clearSelection = clearSelection;
		vm.deleteSelection = deleteSelection;
		vm.crearCliente = crearCliente;
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