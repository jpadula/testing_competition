'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus','$rootScope',
	function($scope, Authentication, Menus,$rootScope) {
		
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		$scope.clickedOnCompetition = false;
		$scope.competitionID = null;
		$scope.competitionName = null;
		$scope.myGroupName = null;

		$rootScope.$on('clickOnCompetition',function(req,msg){
			$scope.clickedOnCompetition = msg.showMenues;
			$scope.competitionID = msg.competitionID;
			$scope.competitionName = msg.competitionName
			$scope.myGroupName = msg.groupName
		});
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);