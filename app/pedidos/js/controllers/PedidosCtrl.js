(function() {
	'use strict';
	angular.module('sbAdminApp').controller('PedidosController', PedidosController);

	PedidosController.$inject = ['notify', '$log', '$sce', '$modal', 'Cliente', 'Bebida', 'Plato', 'Pedido'];

	function PedidosController (notify, $log, $sce, $modal, Cliente, Bebida, Plato, Pedido) {
		var vm = this;
		vm.title = 'Pedidos';
		vm.pedido = {};
		vm.itemPlato = {};
		vm.itemBebida = {};
		vm.items = [];
		vm.total = 0;

		vm.listaClientes = [];
		vm.listaBebidas = [];
		vm.listaPlatos = [];
		vm.errors = [];

		vm.crearCliente = crearCliente;
		vm.addItem = addItem;
		vm.removeItem = removeItem;
		vm.updateDireccion = updateDireccion;
		vm.crearPedido = crearPedido;
		vm.calcularTotal = calcularTotal;
		vm.cargarClientes = cargarClientes;
		vm.cargarPlatos = cargarPlatos;
		vm.cargarBebidas = cargarBebidas;

		vm.clearForm = clearForm;
		vm.trustAsHtml = trustAsHtml;

		vm.init = init;

		vm.init();

		function crearCliente () {
			var clienteModal = $modal.open({
				templateUrl: '/clientes/views/modals/crear-cliente-modal.html',
				controller: 'CrearClienteModalInstanceController',
				controllerAs: 'vm'
			});

			clienteModal.result.then(handleOk, dismissed);

			function handleOk (argument) {
				// body...
				notify('Nuevo cliente ingresado.');
				cargarClientes();
			}

			function dismissed (argument) {
				// body...
				$log.debug('no se creo ningun cliente.');
				$log.debug(argument);
			}
		}

		function crearPedido () {
			vm.pedido.items = vm.items;
			vm.pedido.fecha = new Date();
			// body...
			Pedido.create(vm.pedido).then(ok, showErrors);

			function ok () {
				vm.clearForm();
				notify('Nuevo pedido ingresado.');
			}
		}

		function trustAsHtml (value) {
			return $sce.trustAsHtml(value);
		}

		function calcularTotal () {
			vm.total = _.map(vm.items, function(item) {
				return item.producto.precio * item.cantidad;
			}).reduce(function(sum, n) {
				return sum + n;
			});
		}

		function clearForm () {
			vm.items = [];
			vm.pedido = {};
		}

		function addItem (item) {
			item.cantidad = 1;
			vm.items.push(angular.copy(item));
			vm.calcularTotal();
		}

		function removeItem (item) {
			_.remove(vm.items, function(i) {
				return item === i;
			});
			vm.calcularTotal();
		}

		function updateDireccion () {
			if (angular.isObject(vm.pedido.cliente)) {
				vm.pedido.direccion = vm.pedido.cliente.direccion;
			}
		}
		function cargarClientes () {
			Cliente.getList().then(ok, showErrors);

			function ok (data) {
				vm.listaClientes = data;
			}
		}

		function cargarBebidas () {
			Bebida.getList().then(ok, showErrors);

			function ok (data) {
				vm.listaBebidas = data;
			}
		}

		function cargarPlatos () {
			Plato.getList().then(ok, showErrors);

			function ok (data) {
				vm.listaPlatos = data;
			}
		}

		function showErrors (response) {
			vm.errors.push(response);
		}

		function init () {
			vm.cargarPlatos();
			vm.cargarBebidas();
			vm.cargarClientes();
		}
	}
})();