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
          			only: ['admin','user'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('reportBug', {
			url: '/competitions/:competitionId/reportBug',
			templateUrl: 'modules/competitions/views/create-bug.client.view.html',
			data: {
        		permissions: {
          			only: ['admin','user'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('allBugs', {
			url: '/competitions/:competitionId/allBugs',
			templateUrl: 'modules/competitions/views/list-bugs.client.view.html',
			data: {
        		permissions: {
          			only: ['admin','user'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('myGroupBugs', {
			url: '/competitions/:competitionId/myGroupBugs',
			templateUrl: 'modules/competitions/views/list-my-open-bugs.client.view.html',
			data: {
        		permissions: {
          			only: ['admin','user'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('usersRanking', {
			url: '/competitions/:competitionId/usersRanking',
			templateUrl: 'modules/competitions/views/datatable-users-ranking.client.view.html',
			data: {
        		permissions: {
          			only: ['admin','user'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('groupsRanking', {
			url: '/competitions/:competitionId/groupsRanking',
			templateUrl: 'modules/competitions/views/datatable-groups-ranking.client.view.html',
			data: {
        		permissions: {
          			only: ['admin','user'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('groupsWithMoreBugsRanking', {
			url: '/competitions/:competitionId/groupsWithMoreBugsRanking',
			templateUrl: 'modules/competitions/views/datatable-groups-with-more-bugs-ranking.client.view.html',
			data: {
        		permissions: {
          			only: ['admin','user'],
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
		}).
		state('listMyCompetitions', {
			url: '/my_competitions',
			templateUrl: 'modules/competitions/views/my-competitions-list.view.html',
			data: {
        		permissions: {
          			only: ['user'],
          			redirectTo: 'home'
        		}
      		}
		});
	}
]);