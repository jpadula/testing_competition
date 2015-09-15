'use strict';

//Competitions service used to communicate Competitions REST endpoints
angular.module('competitions').factory('Competitions', ['$resource',
	function($resource) {
		return $resource('competitions/:competitionId', { competitionId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

//Bugs service used to communicate Competitions REST endpoints
angular.module('competitions').factory('Bugs', ['$resource','$http',
	function($resource,$http) {
		return {
			reportBug: function(bug,cb) {				
				$http.post('/bugs',bug).success(function(bug){
					cb(bug);
				});
			},
			getByGroupId: function(config,cb) {
				$http.post('/bugs/getByGroupId',config).success(function(bugs){
					cb(bugs);
				});
			},
			getOpenBugs: function(config,cb) {
				$http.post('/bugs/getOpenBugs',config).success(function(bugs){
					cb(bugs);
				});
			},
			getMyOpenBugs: function(config,cb) {
				$http.post('/bugs/getMyOpenBugs',config).success(function(bugs){
					cb(bugs);
				});
			},
			changeStatus: function(config,cb) {
				$http.put('/bugs/'+config.bugId,config).success(function(bug){
					cb(bug);
				});
			},
			getUsersRanking: function(config,cb) {
				$http.post('/bugs/getUsersRanking',config).success(function(ranking){
					cb(ranking);
				});
			}
		}
	}
]);