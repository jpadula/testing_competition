'use strict';

//Setting up route
angular.module('competitions').config(['$stateProvider',
	function($stateProvider) {
		// Competitions state routing
		$stateProvider.
		state('listCompetitions', {
			url: '/competitions',
			templateUrl: 'modules/competitions/views/list-competitions.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('createCompetition', {
			url: '/competitions/create',
			templateUrl: 'modules/competitions/views/create-competition.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('viewCompetition', {
			url: '/competitions/:competitionId',
			templateUrl: 'modules/competitions/views/view-competition.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('editCompetition', {
			url: '/competitions/:competitionId/edit',
			templateUrl: 'modules/competitions/views/edit-competition.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		});
	}
]);