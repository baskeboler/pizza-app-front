(function(){

	'use strict';
	angular
		.module('sbAdminApp')
		.factory('Cliente', Cliente);

	Cliente.$inject = ['Restangular', '$log'];
	function Cliente (Restangular, $log) {
		// body...
		var service =  {
			getList: getList,
			create: createCliente
		};

		return service;

		function getList () {
			// body...
			return Restangular.all('clientes').getList();
		}

		function createCliente (cliente) {
			// body...
			return Restangular.all('clientes').post(cliente);
		}
	}
})();