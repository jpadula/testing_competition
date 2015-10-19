'use strict';

// Competitions controller
angular.module('competitions').controller('MyCompetitionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'MyCompetitions','NgTableParams',
	function($scope, $stateParams, $location, Authentication, MyCompetitions,NgTableParams) {
		$scope.find = function(){
			MyCompetitions.getMyCompetitions(function(competitions){
				$scope.competitions = competitions;
			});
		}
	}
]);