'use strict';

// Logs controller
angular.module('logs').controller('LogsController', ['$scope', '$stateParams', '$location','NgTableParams','Authentication', 'Logs',
	function($scope, $stateParams, $location,NgTableParams, Authentication, Logs) {
		$scope.findAll = function() {
			$scope.logs = Logs.getAllLogs(function(err,logs){
				if (!err) {
					$scope.logs = logs;
					$scope.groupsRankingDatatable();
				} else {
					//error
				}
			});
		};

		$scope.groupsRankingDatatable = function() {
			var data = $scope.logs;
			$scope.datatableLogs = new NgTableParams({page: 1,count: 10}, { data: data,filterDelay: 300});
		};
	}
]);