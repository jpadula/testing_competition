'use strict';

// Competitions controller
angular.module('competitions').controller('CompetitionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Competitions','Bugs','Groups',
	function($scope, $stateParams, $location, Authentication, Competitions,Bugs,Groups) {
		$scope.authentication = Authentication;
		
		//this is the model that contain the selected groups for a Competition
		$scope.groupsSelectedList=[];
		$scope.wrapperGroupsList = [];

		//initialize open Bugs to list
		$scope.openBugs;
		
		//boolean variables to hide/show menues
		$scope.showCreateBug = false;
		$scope.showOpenBugs = false;

		

		//functions that use Bugs service
		$scope.reportBug = function() {
			var bug = {
				className: this.className,
				routineName: this.routineName,
				description: this.description,
				competition: $scope.competition._id
			};

			Bugs.reportBug(bug,function(bug){
				console.log("Se guardo: ",bug);
			});
		}

		$scope.searchOpenBugs = function() {
			
			$scope.showOpenBugs = !$scope.showOpenBugs;
			var config = {
				competition: $scope.competition._id
			};
			if ($scope.showOpenBugs){
				Bugs.getOpenBugs(config,function(bugs){
					$scope.openBugs=bugs;
					console.log("Bugs",bugs);
				});
			}
		};

		//TODO: modularize (priority: 10)
		$scope.getAllGroupsWrapperList = function(){
			Groups.query(function(groups){
				if ($scope.competition) { //is a edit action
					for (var i = groups.length - 1; i >= 0; i--) {
						var tmpFlag = false;
						for (var j = $scope.competition.groupsList.length - 1; j >= 0; j--) {
							if ($scope.competition.groupsList[j]._id == groups[i]._id){
								tmpFlag=true;
								break;
							}
						};
						groups[i].selected=tmpFlag;
						$scope.wrapperGroupsList.push(groups[i]);
					};
				} else { // is a create action
					$scope.wrapperGroupsList = groups;
				}
			});
		};
		
		// Create new Competition
		$scope.create = function() {
			// Create new Competition object
			var competition = new Competitions ({
				name: this.name,
				groupsList: $scope.groupsSelectedList
			});

			// Redirect after save
			competition.$save(function(response) {
				$location.path('competitions/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.groupsSelectedList = [];
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Competition
		$scope.remove = function(competition) {
			if ( competition ) { 
				competition.$remove();

				for (var i in $scope.competitions) {
					if ($scope.competitions [i] === competition) {
						$scope.competitions.splice(i, 1);
					}
				}
			} else {
				$scope.competition.$remove(function() {
					$location.path('competitions');
				});
			}
		};

		// Update existing Competition
		$scope.update = function() {
			var competition = $scope.competition;

			competition.$update(function() {
				$location.path('competitions/' + competition._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Competitions
		$scope.find = function() {
			$scope.competitions = Competitions.query();
		};

		// Find existing Competition
		$scope.findOne = function() {
			Competitions.get({ 
				competitionId: $stateParams.competitionId
			},function(competition){
				$scope.competition = competition;
				$scope.getAllGroupsWrapperList();
			});
		};
	}
]);