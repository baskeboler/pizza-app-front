(function() {
	'use strict';

	angular.module('sbAdminApp')
		.factory('ConfirmDialog', ConfirmDialog);
	angular.module('sbAdminApp')
		.controller('ConfirmDialogModalInstanceController', ConfirmDialogModalInstanceController);

	function ConfirmDialog($log, $modal) {
		// body...
		var service = {
			confirm: confirm,
			alert: alert
		};

		return service;

		function confirm(title, message) {
			// body...
			var headerTitle = 'Confirmation';
			if (!angular.isDefined(title)) {
				headerTitle = title;
			}
			var modal = $modal.open({
				templateUrl: 'scripts/services/confirm-dialog/views/template.html',
				controller: 'ConfirmDialogModalInstanceController',
				controllerAs: 'vm',
				size: 'sm',
				resolve: {
					title: function() {
						return title
					},
					message: function() {
						return message;
					}
				}
			});

			return modal;
		}

		function alert(message) {
			// body...
		}
	}

	function ConfirmDialogModalInstanceController($modalInstance, title, message) {
		var vm = this;
		vm.title = title;
		vm.message = message;
		vm.ok = ok;
		vm.cancelar = cancelar;

		function ok() {
			$modalInstance.close('ok');
		}

		function cancelar() {
			$modalInstance.dismiss('cancelar');
		}
	}
})();