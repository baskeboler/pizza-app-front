(function() {
	'use strict';
	angular
		.module('sbAdminApp')
		.factory('Bebida', Bebida);

	function Bebida(Restangular, $log) {
		var service = {
			getList: getList,
			create: create
		};

		return service;

		function getList(pagination) {
			return Restangular.all('bebidas')
				.getList(pagination);
		}

		function create(bebida) {
			return Restangular.all('bebidas')
				.post(bebida);
		}
	}
})();