(function() {
	'use strict';
	angular
		.module('sbAdminApp')
		.factory('Pedido', Pedido);

	function Pedido (Restangular, $log) {
		var service = {
			getList: getList,
			create: create
		};

		return service;

		function getList () {
			return Restangular.all('pedidos').getList();
		}

		function create (pedido) {
			return Restangular.all('pedidos').post(pedido);
		}
	}
})();