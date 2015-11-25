'use strict';

// Competitions controller
angular.module('competitions').controller('MyCompetitionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'MyCompetitions','NgTableParams','$rootScope',
	function($scope, $stateParams, $location, Authentication, MyCompetitions,NgTableParams,$rootScope) {
		$scope.find = function(){
			MyCompetitions.getMyCompetitions(function(competitions){
				$scope.competitions = competitions;
			});
		}
	}
]);