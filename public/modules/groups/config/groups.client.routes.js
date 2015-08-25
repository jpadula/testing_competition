'use strict';

//Setting up route
angular.module('groups').config(['$stateProvider',
	function($stateProvider) {
		// Groups state routing
		$stateProvider.
		state('listGroups', {
			url: '/groups',
			templateUrl: 'modules/groups/views/list-groups.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('createGroup', {
			url: '/groups/create',
			templateUrl: 'modules/groups/views/create-group.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('viewGroup', {
			url: '/groups/:groupId',
			templateUrl: 'modules/groups/views/view-group.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('editGroup', {
			url: '/groups/:groupId/edit',
			templateUrl: 'modules/groups/views/edit-group.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		});
	}
]);