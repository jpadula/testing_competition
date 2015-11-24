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

angular.module('competitions').factory('MyCompetitions', ['$resource','$http',
	function($resource,$http) {
		return {
			getMyCompetitions: function(cb){
				$http.get('myCompetitions').success(function(competitions){
					cb(competitions);
				});
			}
		}
	}
]);

//Bugs service used to communicate Competitions REST endpoints
angular.module('competitions').factory('Bugs', ['$resource','$http',
	function($resource,$http) {
		return {
			reportBug: function(bug,cb) {				
				$http.post('/bugs',bug).success(function(bug){
					cb(null,bug);
				}).error(function(error){
					cb(error,null);
				});
			},
			getByGroupId: function(config,cb) {
				$http.post('/bugs/getByGroupId',config).success(function(bugs){
					cb(bugs);
				});
			},
			getAllByCompetition: function(config,cb) {
				$http.post('/bugs/getAllByCompetition',config).success(function(bugs){
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
				}).error(function(error){
					console.log("Error: ",error);
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
			},
			getGroupsRanking: function(config,cb) {
				$http.post('/bugs/getGroupsRanking',config).success(function(ranking){
					cb(ranking);
				});
			},
			getGroupsWithMoreBugsRanking: function(config,cb) {
				$http.post('/bugs/getGroupsWithMoreBugsRanking',config).success(function(ranking){
					cb(ranking);
				});
			}
		}
	}
]);