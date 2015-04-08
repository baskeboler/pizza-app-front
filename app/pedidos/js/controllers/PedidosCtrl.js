(function() {
	'use strict';
	angular.module('sbAdminApp').controller('PedidosController', PedidosController);

	PedidosController.$inject = ['Restangular', '$log', '$sce', '$modal'];

	function PedidosController (Restangular, $log, $sce, $modal) {
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

		vm.clientes = Restangular.all('clientes');
		vm.bebidas = Restangular.all('bebidas');
		vm.platos = Restangular.all('platos');
		vm.pedidos = Restangular.all('pedidos');

		vm.init();

		function crearPedido () {
			vm.pedido.items = vm.items;
			vm.pedido.fecha = new Date();
			// body...
			vm.pedidos.post(vm.pedido).then(ok, showErrors);

			function ok () {
				vm.clearForm();
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
			vm.clientes.getList().then(ok, showErrors);

			function ok (data) {
				vm.listaClientes = data;
			}
		}

		function cargarBebidas () {
			vm.bebidas.getList().then(ok, showErrors);

			function ok (data) {
				vm.listaBebidas = data;
			}
		}

		function cargarPlatos () {
			vm.platos.getList().then(ok, showErrors);

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