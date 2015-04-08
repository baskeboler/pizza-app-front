(function() {
	'use strict';
	angular
		.module('sbAdminApp')
		.factory('Bebida', Bebida);

	function Bebida (Restangular, $log) {
		var service = {
			getList: getList,
			create: create
		};

		return service;

		function getList () {
			return Restangular.all('bebidas').getList();
		}

		function create (bebida) {
			return Restangular.all('bebidas').post(bebida);
		}
	}
})();