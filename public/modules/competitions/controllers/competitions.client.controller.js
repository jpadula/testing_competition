'use strict';

// Competitions controller
angular.module('competitions').controller('CompetitionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Competitions','Bugs','Groups','NgTableParams',
	function($scope, $stateParams, $location, Authentication, Competitions,Bugs,Groups,NgTableParams) {
		$scope.authentication = Authentication;
		
		//this is the model that contain the selected groups for a Competition
		$scope.groupsSelectedList=[];
		$scope.wrapperGroupsList = [];

		//initialize open Bugs to list
		$scope.openBugs;
		$scope.myOpenBugs;

		//ranking types
		$scope.rankingTypes = [{name:'Users Ranking'},{name:'Groups Ranking'}];
		
		//boolean variables to hide/show menues
		$scope.showCreateBug = true;
		$scope.showOpenBugs = false;
		$scope.showMyOpenBugs = false;
		$scope.showListBugsPerGroup = false;
		$scope.showRanking = false;
		$scope.showUsersRanking = false;
		$scope.showGroupsRanking = false;

		
		$scope.showRanking = function(ranking) {
			console.log(ranking);
			if (ranking.name == "Users Ranking"){
				//$scope.showUsersRanking = true;
				$scope.getUsersRanking();
			} else if (ranking.name == "Groups Ranking") {
				//$scope.getUsersRanking();
			}
		};


		$scope.usersRankingDatatable = function() {
			//var data = [{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name:"Jorge",age:24} /*,*/];
			var data = $scope.usersRanking;
			$scope.datatableUsersRanking = new NgTableParams({page: 1,count: 10}, { data: data,filterDelay: 300});
		};

		$scope.bugsRepeatListDatatable = function() {
			//var data = [{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name:"Jorge",age:24} /*,*/];
			var data = $scope.openBugs;
			$scope.datatableListBugsRepeat = new NgTableParams({page: 1,count: 10}, { data: data,filterDelay: 300});
		};
		$scope.myOpenBugsDatatable = function() {
			//var data = [{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name:"Jorge",age:24} /*,*/];
			var data = $scope.myOpenBugs;
			$scope.datatableMyOpenBugs = new NgTableParams({page: 1,count: 10}, { data: data,filterDelay: 300});
		};


		function restartShowsVariables(exception) {
			$scope.showCreateBug = false;
			$scope.showOpenBugs = false;
			$scope.showMyOpenBugs = false;
			$scope.showListBugsPerGroup = false;
			$scope.showRanking = false;
			$scope.showUsersRanking = false;
			$scope.showGroupsRanking = false;

		};

		$scope.changeStatus =function(bugId,newStatus) {
			var config = {
				bugId: bugId,
				status : newStatus
			}
			Bugs.changeStatus(config,function(bug){
				console.log("Status changed");
				$scope.searchMyOpenBugs();
			});
		};

		$scope.getUsersRanking = function() {
			var config = {
				competition:$scope.competition._id
			};
			
			Bugs.getUsersRanking(config,function(ranking){
				$scope.usersRanking = ranking;
				var showUsersRanking = $scope.showUsersRanking;
				restartShowsVariables();
				$scope.showUsersRanking = !showUsersRanking;
			});
		};

		$scope.getGroupsRanking = function() {
			/*var config = {
				competition:$scope.competition._id
			};
			
			Bugs.getGroupsRanking(config,function(ranking){
				$scope.groupsRanking = ranking;
				var showGroupsRanking = $scope.showGroupsRanking;
				restartShowsVariables();
				$scope.showGroupsRanking = !showGroupsRanking;
			});*/
			restartShowsVariables();
			$scope.showGroupsRanking = !showGroupsRanking;
		};


		$scope.getBugsPerGroup = function(group) {
			console.log(group)
			var showListBugsPerGroup = $scope.showListBugsPerGroup;
			restartShowsVariables();
			$scope.showListBugsPerGroup = !showListBugsPerGroup
			var config = {
				competition: $scope.competition._id,
				groupId: group
			};
			Bugs.getByGroupId(config,function(bugs){
				$scope.openBugs=bugs;
				console.log("Bugs",bugs);
			});

		};

		//functions that use Bugs service
		$scope.reportBug = function() {
			var bug = {
				className: this.className,
				routineName: this.routineName,
				description: this.description,
				competition: $scope.competition._id,
				group_reported: this.group._id
			};

			Bugs.reportBug(bug,function(bug){
				console.log("Se guardo: ",bug);
			});
		};

		$scope.searchMyOpenBugs = function() {
			var showMyOpenBugs = $scope.showMyOpenBugs;
			restartShowsVariables();
			$scope.showMyOpenBugs = !showMyOpenBugs;
			var config = {
				competition: $scope.competition._id
			};
			if ($scope.showMyOpenBugs){
				Bugs.getMyOpenBugs(config,function(bugs){
					$scope.myOpenBugs=bugs;
					console.log("Bugs",bugs);
				});
			}
		};

		$scope.searchOpenBugs = function() {
			var showOpenBugs = $scope.showOpenBugs;
			restartShowsVariables();
			$scope.showOpenBugs = !showOpenBugs;
		};

		$scope.changeShowStatus = function(vble) {
			var variable = $scope[vble];
			restartShowsVariables();
			$scope[vble] = !variable;
		};

		$scope.getGroups = function() {
			console.log($scope.competition);
			Groups.query(function(groups){
				$scope.allGroups = groups;
			});
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
				groupsList: $scope.groupsSelectedList,
				POINTS: {
					FIRST_BUG_IN_CLASS_C: this.FIRST_BUG_IN_CLASS_C,
					NOT_FIRST_BUG_IN_CLASS_C_BUT_YES_IN_ROUTINE_R: this.NOT_FIRST_BUG_IN_CLASS_C_BUT_YES_IN_ROUTINE_R,
					NOT_FIRST_BUG_IN_CLASS_C_AND_NOT_FIRST_IN_ROUTINE_R: this.NOT_FIRST_BUG_IN_CLASS_C_AND_NOT_FIRST_IN_ROUTINE_R,
					PERSON_WHO_SUBMITTED_AN_ACCEPTED_BUG: this.PERSON_WHO_SUBMITTED_AN_ACCEPTED_BUG,
					PERSON_WHO_SUBMITTED_A_REJECTED_BUG: this.PERSON_WHO_SUBMITTED_A_REJECTED_BUG	
				}
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
				$scope.getGroups();
			},function(err){
				console.log(err);
				$location.path('/');
			});
		};
	}
]);