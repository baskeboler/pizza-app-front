(function() {
	'use strict';

	angular
		.module('sbAdminApp')
		.filter('fromnow', fromNow);

	function fromNow () {
		return function  (argument) {
			return moment(argument).fromNow();
			// body...
		};
	}
})();