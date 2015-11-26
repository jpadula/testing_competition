'use strict';

//Setting up route
angular.module('countries').config(['$stateProvider',
	function($stateProvider) {
		// Countries state routing
		$stateProvider.
		state('listLogs', {
			url: '/logs',
			templateUrl: 'modules/logs/views/list-logs.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		})
	}
]);