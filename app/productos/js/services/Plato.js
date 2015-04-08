(function() {
	'use strict';
	angular
		.module('sbAdminApp')
		.factory('Plato', Plato);

	function Plato (Restangular, $log) {
		var service = {
			getList: getList,
			create: create
		};

		return service;

		function getList () {
			return Restangular.all('platos').getList();
		}

		function create (plato) {
			return Restangular.all('platos').post(plato);
		}
	}
})();