(function() {

	'use strict';
	angular
		.module('sbAdminApp')
		.controller('ListaPedidosController', ListaPedidosController);

	function ListaPedidosController (Pedido, notify, $log) {
		var vm = this;
		vm.listaPedidos = [];

		vm.cargarPedidos = cargarPedidos;

		vm.cargarPedidos();

		function cargarPedidos () {
			Pedido.getList().then(handlePedidos, handleError);

			function handlePedidos (data) {
				vm.listaPedidos = data;
				_.each(vm.listaPedidos, function(pedido) {
					pedido.total = calcTotalPedido(pedido);
					$log.debug(pedido.total)
				});

				vm.diario = _.groupBy(vm.listaPedidos, function(p) {
					return moment(p.fecha, 'YYYMMDD').format('YYYY-MM-DD');
				});
			}

			function handleError (argument) {
				// body...
				notify('error');
			}
		}

		function calcTotalPedido (pedido) {
			return _.map(pedido.items, function(item) { 
					return +item.producto.precio * item.cantidad
				})
				.reduce(function(sum, n) {return sum + n});
		}
	}

})()
