/**
* sbAdminApp Module
*
* Description
*/
angular.module('sbAdminApp')
.controller('ClienteController', function($scope, $resource, $log, lodash){
	$scope.titulo = 'Cosa de clientes';
	$scope.clientes = $resource('http://localhost:8080/clientes/:id', {}, {
		query: {
			method: 'GET',
			isArray: false
		}
	});
	$scope.gOpts = {
		columnDefs: [
			{
				field: 'nombre',
				displayName: 'Nombre'
			},
			{
				field: 'email',
				displayName: 'E-mail'
			}
		],
		data: 'listaClientes',
		jqueryUITheme: true
	};

	$scope.nuevo = {

	};

	$scope.crearCliente = function() {
		$scope.clientes.save($scope.nuevo, function() {
			$log.log('hola');
		});
	};

	$scope.clientes.query({}, function (data) {
		$scope.listaClientes = data._embedded.clientes;
		$scope.numClientes = $scope.listaClientes.length;
		// body...

	});
});