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
			for (var i = data.length - 1; i >= 0; i--) {
				pushCodeText(data[i]);
			};
			$scope.datatableLogs = new NgTableParams({page: 1,count: 10}, { data: data,filterDelay: 300});
		};

		var pushCodeText = function(element) {
			console.log('Element: ',element);
			if (element.pageCode == 1)
				element.pageText = 'Signin'
			if (element.pageCode == 2)
				element.pageText = 'Failed Signin'
			if (element.pageCode == 3)
				element.pageText = 'Signout '
			if (element.pageCode == 4)
				element.pageText = 'Report Bug'
			if (element.pageCode == 5)
				element.pageText = 'Report Gold Medal'
			if (element.pageCode == 6)
				element.pageText = 'Report Silver Medal'
			if (element.pageCode == 7)
				element.pageText = 'Report Accepted Bug'
			if (element.pageCode == 8)
				element.pageText = 'Report Rejected Bug'
			if (element.pageCode == 9)
				element.pageText = 'Access Ranking Per User'
			if (element.pageCode == 10)
				element.pageText = 'Access Ranking Per Group'
			if (element.pageCode == 11)
				element.pageText = 'Access More Bugs In Groups'

			return element;
		}
	}
]);