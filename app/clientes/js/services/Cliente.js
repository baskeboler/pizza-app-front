(function() {

	'use strict';
	angular
		.module('sbAdminApp')
		.factory('Cliente', Cliente);

	Cliente.$inject = ['Restangular', '$log'];

	function Cliente(Restangular, $log) {
		// body...
		var service = {
			getList: getList,
			create: createCliente,
			suggest: suggest
		};

		return service;

		function suggest(qString) {
			return Restangular.all('')
				.customGETLIST('clientes/search/suggest', {
					q: qString
				})
		}

		function getList(pagination) {
			// body...
			return Restangular.all('clientes')
				.getList(pagination);
		}

		function createCliente(cliente) {
			// body...
			return Restangular.all('clientes')
				.post(cliente);
		}
	}
})();