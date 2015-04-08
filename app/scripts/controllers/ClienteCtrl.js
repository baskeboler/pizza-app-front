/**
* sbAdminApp Module
*
* Description
*/
angular.module('sbAdminApp')
.controller('ClienteController', function($scope, Restangular, $log){
	$scope.titulo = 'Cosa de clientes';
	$scope.clientes = Restangular.all('clientes');
	$scope.clientes.getList().then(function(result) {
		$log.debug(result);
		$scope.clientes = result;
		$scope.listaClientes = result;
		$scope.numClientes = $scope.listaClientes.length;
	});
	$scope.selectedClient = [];
	$scope.clearSelection = function  () {
		// body...
		$scope.selectedClient.pop();
	};

	$scope.deleteSelection = function() {
		$scope.selectedClient[0].remove().then(function(){

			_.remove($scope.listaClientes, function (argument) {
				return argument === $scope.selectedClient[0]
			});
			$scope.selectedClient.pop();
		});
	};

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
		jqueryUITheme: true,
		selectedItems: $scope.selectedClient,
		multiSelect: false
	};

	$scope.nuevo = {

	};

	$scope.crearCliente = function() {
		$scope.clientes.post($scope.nuevo).then(function(){
			$scope.listaClientes.push($scope.nuevo);
			$scope.nuevo = {};
		});
	};

	/*$scope.clientes.query({}, function (data) {
		$scope.listaClientes = data._embedded.clientes;
		$scope.numClientes = $scope.listaClientes.length;
		// body...

	});*/
});