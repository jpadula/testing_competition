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

angular.module('competitions').factory('CompetitionsUtils',[function(){
	return {
		getMyGroup: function(groupsList,actualUserName) {
			var result = null;
			for (var i = groupsList.length - 1; i >= 0; i--) {
				for (var j = groupsList[i].studentsArrayList.length - 1; j >= 0; j--) {
					if (groupsList[i].studentsArrayList[j] == actualUserName) {
						result = groupsList[i];
						break;
					}
				};
				if (result != null)
					break;
			}
			return result;
		}
	}
}]);

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
				console.log(config);
				$http.put('/bugs/'+config.bugId,config).success(function(bug){
					cb(null,bug);
				}).error(function(err){
					cb(err,null);
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
			},
			getById: function(id,cb) {
				$http.get('/bugs/'+id).success(function(bug){
					cb(null,bug);
				}).error(function(err){
					cb(err,null);
				});
			}
		}
	}
]);