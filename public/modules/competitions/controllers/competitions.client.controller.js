'use strict';

// Competitions controller
angular.module('competitions').controller('CompetitionsController', ['$scope', '$stateParams', '$location','$q', 'Authentication', 'Competitions','Bugs','Groups','NgTableParams','$rootScope','CompetitionsUtils',
	function($scope, $stateParams, $location,$q, Authentication, Competitions,Bugs,Groups,NgTableParams,$rootScope,CompetitionsUtils) {
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
		$scope.showActionColumn = false;
		$scope.showCreateBug = true;
		$scope.showOpenBugs = false;
		$scope.showMyOpenBugs = false;
		$scope.showListBugsPerGroup = false;
		$scope.showRanking = false;
		$scope.showUsersRanking = false;
		$scope.showGroupsRanking = false;
		$scope.showGroupsWithMoreBugsRanking = false;

		$scope.showRankingType = function(ranking) {
			if (ranking.toUpperCase()=== "USERS RANKING"){
				//$scope.showUsersRanking = true;
				$scope.getUsersRanking();
			} else if (ranking.toUpperCase()==="GROUPS RANKING") {
				//$scope.getUsersRanking();
				$scope.getGroupsRanking();
			}
			 else if (ranking.toUpperCase()==="GROUPS WITH MORE BUGS RANKING") {
				//$scope.getUsersRanking();
				$scope.getGroupsWithMoreBugsRanking();
			}

		};

		$scope.usersRankingDatatable = function() {
			//var data = [{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name:"Jorge",age:24} /*,*/];
			var data = $scope.usersRanking;
			$scope.datatableUsersRanking = new NgTableParams({page: 1,count: 10}, { data: data,filterDelay: 300});
		};
		$scope.groupsRankingDatatable = function() {
			//var data = [{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name:"Jorge",age:24} /*,*/];
			var data = $scope.groupsRanking;
			$scope.datatableGroupsRanking = new NgTableParams({page: 1,count: 10}, { data: data,filterDelay: 300});
		};
		$scope.groupsWithMoreBugsRankingDatatable = function() {
			//var data = [{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name: "Moroni", age: 50},{name:"Jorge",age:24} /*,*/];
			var data = $scope.groupsWithMoreBugsRanking;
			$scope.datatableGroupsWithMoreBugsRanking = new NgTableParams({page: 1,count: 10}, { data: data,filterDelay: 300});
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
			$scope.showGroupsWithMoreBugsRanking = false;
		};

		$scope.changeStatus =function(bugId,newStatus) {
			var config = {
				bugId: bugId,
				status : newStatus
			}
			Bugs.changeStatus(config,function(err,bug){
				if (!err && bug != null){
					$scope.searchMyOpenBugs();
					if ($scope.currentBug)
						$scope.currentBug.status = newStatus;
					//success
					$scope.success='Bug ' + newStatus + ' Successfuly';
				} else {
					//error
					$scope.error='Error when '+newStatus+' the bug: '+err;
				}
			});
		};

		$scope.getUsersRanking = function() {
			if (!$rootScope.competition) {
				$scope.findOne();
			}
		
			var id;
			var competitionName = 'N/A';
			if (!$rootScope.competition){
				id = $stateParams.competitionId;
			}
			else{
				id = $rootScope.competition._id;
				competitionName = $rootScope.competition.name;
			}
			var config = {
				competition:id,
				competitionName:competitionName
			};
			
			Bugs.getUsersRanking(config,function(ranking){
				$scope.usersRanking = ranking;
				$scope.usersRankingDatatable();
				var showUsersRanking = $scope.showUsersRanking;
				restartShowsVariables();
				$scope.showUsersRanking = !showUsersRanking;
			});
		};

		$scope.getGroupsRanking = function() {
			if (!$rootScope.competition) {
				$scope.findOne();
			};
			var id;
			var competitionName = 'N/A';
			if (!$rootScope.competition){
				id = $stateParams.competitionId;
			}
			else{
				id = $rootScope.competition._id;
				competitionName = $rootScope.competition.name;
			}
			var config = {
				competition:id,
				competitionName:competitionName
			};

			Bugs.getGroupsRanking(config,function(ranking){
				$scope.groupsRanking = ranking;
				$scope.groupsRankingDatatable();
				var showGroupsRanking = $scope.showGroupsRanking;
				restartShowsVariables();

				$scope.showGroupsRanking = !showGroupsRanking;
			});
		};

		$scope.getGroupsWithMoreBugsRanking = function() {
			if (!$rootScope.competition) {
				$scope.findOne();
			};
			var id;
			var competitionName = 'N/A';
			if (!$rootScope.competition){
				id = $stateParams.competitionId;
			}
			else{
				id = $rootScope.competition._id;
				competitionName = $rootScope.competition.name;
			}
			var config = {
				competition:id,
				competitionName:competitionName
			};

			Bugs.getGroupsWithMoreBugsRanking(config,function(ranking){
				$scope.groupsWithMoreBugsRanking = ranking;
				$scope.groupsWithMoreBugsRankingDatatable();
				var showGroupsWithMoreBugsRanking = $scope.showGroupsWithMoreBugsRanking;
				restartShowsVariables();

				$scope.showGroupsWithMoreBugsRanking = !showGroupsWithMoreBugsRanking;
			});
		};



		$scope.getBugsPerGroup = function(group) {
			var showListBugsPerGroup = $scope.showListBugsPerGroup;
			restartShowsVariables();
			$scope.showListBugsPerGroup = !showListBugsPerGroup

			var config = {
				competition: $scope.competition._id,
				groupId: group
			};
			Bugs.getByGroupId(config,function(bugs){
				$scope.openBugs=bugs;
				$scope.bugsRepeatListDatatable();
			});
			

		};

		$scope.getAllByCompetition = function() {
			if (!$rootScope.competition) {
				$scope.findOne();
			};
			var showListBugsPerGroup = $scope.showListBugsPerGroup;
			restartShowsVariables();
			$scope.showListBugsPerGroup = !showListBugsPerGroup
			var id;
			if (!$rootScope.competition)
				id = $stateParams.competitionId;
			else
				id = $rootScope.competition._id

			var config = {
				competition: id
			};
			Bugs.getAllByCompetition(config,function(bugs){
				$scope.openBugs=bugs;
				$scope.bugsRepeatListDatatable();
			});

			/*
			var config = {
				competition: $scope.competition._id,
				groupId: group
			};
			Bugs.getByGroupId(config,function(bugs){
				$scope.openBugs=bugs;
				$scope.bugsRepeatListDatatable();
			});
			*/

		};

		//functions that use Bugs service
		$scope.reportBug = function() {

			var bug = {
				className: this.className,
				routineName: this.routineName,
				description: this.description,
				competition: $scope.competition._id,
				group_reported: this.group._id,
				title: this.title,
				groupReportedName : this.group.name,
				competitionName : this.competition.name
			};
			var self = this;
			Bugs.reportBug(bug,function(err,bug){
				if (!err && bug != null){
					//success
					$scope.success='Bug reported Successfuly';
					self.className = '';
					self.routineName = '';
					self.description = '';
					self.group_reported = '';
					self.title = ''

				} else {
					//error
					$scope.error='Error in the bug reported: '+err;
				}
				
			});
		};

		$scope.searchMyOpenBugs = function() {
			if (!$rootScope.competition) {
				$scope.findOne();
			};
			restartShowsVariables();
			var id;
			if (!$rootScope.competition)
				id = $stateParams.competitionId;
			else
				id = $rootScope.competition._id
			var config = {
				competition: id
			};			
			Bugs.getMyOpenBugs(config,function(bugs){
				$scope.myOpenBugs=bugs;
				//if exists the datatable, we reload the information
				if ($scope.datatableMyOpenBugs){
					$scope.myOpenBugsDatatable();
				}
			});
			
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

		//default values
		$scope.FIRST_BUG_IN_CLASS_C = 10;
		$scope.NOT_FIRST_BUG_IN_CLASS_C_BUT_YES_IN_ROUTINE_R = 5;
		$scope.NOT_FIRST_BUG_IN_CLASS_C_AND_NOT_FIRST_IN_ROUTINE_R = 3;
		$scope.PERSON_WHO_SUBMITTED_AN_ACCEPTED_BUG = 2;
		$scope.PERSON_WHO_SUBMITTED_A_REJECTED_BUG = -10;

		// Create new Competition
		$scope.create = function() {
			// Create new Competition object
			var competition = new Competitions ({
				name: this.name,
				description: this.description,
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
			competition.groupsList=$scope.groupsSelectedList,
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

		$scope.viewCreateBug = function() {
			if (!$rootScope.competition) {
				$scope.findOne();
			}
		};

		var wait = function() {
			var deferred = $q.defer();
			setTimeout(function() {
				$scope.findOne();
				if (!$rootScope.competition) {
					deferred.resolve('Success');
				}
			}, 1000);
			return deferred.promise;
		};

		var processFindOneBug = function() {
			Bugs.getById($stateParams.bugId,function(err,bug){
				if (!err) {
					var isMy = isOwn($rootScope.competition.groupsList,bug.group_reported);
					$scope.currentBug=bug;
					$scope.currentBug.isOwn = isMy;
				}
			});
		}

		$scope.findOneBug = function() {
			if (!$rootScope.competition) {
			wait().then(function(msg){
				if (msg == 'Success') {
					processFindOneBug();
				}
			});
			} else {
				processFindOneBug();
			}
		};

		var isOwn = function(groupsList,actualGroupId) {
			var result = false;
			for (var i = groupsList.length - 1; i >= 0; i--) {
				if (groupsList[i]._id == actualGroupId) {
					for (var j = groupsList[i].studentsArrayList.length - 1; j >= 0; j--) {
						if ($scope.authentication.user.username == groupsList[i].studentsArrayList[j]) {
							result = true;
							break;
						}
					};
					break;
				}
			};
			return result;
		};
		// Find existing Competition
		$scope.findOne = function() {
			Competitions.get({ 
				competitionId: $stateParams.competitionId
			},function(competition){
				var myGroup = CompetitionsUtils.getMyGroup(competition.groupsList,$scope.authentication.user.username);
				var groupName = '';
				if (myGroup != null)
					groupName = myGroup.name;
				$rootScope.$broadcast('clickOnCompetition', {
					"competitionID":$stateParams.competitionId,
					"showMenues":true,
					"competitionName":competition.name,
					"groupName": groupName
				});
				$scope.competition = competition;
				$rootScope.competition = competition;
				$scope.getAllGroupsWrapperList();
			},function(err){
				console.log(err);
				$location.path('/');
			});
		};
	}
]);