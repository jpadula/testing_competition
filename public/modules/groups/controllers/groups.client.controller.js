'use strict';

// Groups controller
angular.module('groups').controller('GroupsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Groups','Users',
	function($scope, $stateParams, $location, Authentication, Groups,Users) {
		$scope.authentication = Authentication;
		
		//this is the model that contain the selected users for a Group
		$scope.studentsSelectedList=[];
		$scope.wrapperStudentsList = [];

		//TODO: modularize (priority: 10)
		$scope.getAllStudentsWrapperList = function(){
			Users.query(function(users){
				if ($scope.group) { //is a edit action
					for (var i = users.length - 1; i >= 0; i--) {
						var tmpFlag = false;
						for (var j = $scope.group.studentsList.length - 1; j >= 0; j--) {
							if ($scope.group.studentsList[j]._id == users[i]._id){
								tmpFlag=true;
								break;
							}
						};
						users[i].selected=tmpFlag;
						$scope.wrapperStudentsList.push(users[i]);
					};
				} else { // is a create action
					$scope.wrapperStudentsList = users;
				}
			});
		};

		// Create new Group
		$scope.create = function() {
			// Create new Group object
			var group = new Groups ({
				name: this.name,
				number:this.groupNumber,
				githubAccounts: this.githubAccounts
				//studentsList: $scope.studentsSelectedList
			});
 
			// Redirect after save
			group.$save(function(response) {
				$location.path('groups/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.groupNumber = '';
				$scope.githubAccounts = '';
				//$scope.studentsSelectedList = [];
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Group
		$scope.remove = function(group) {
			if ( group ) { 
				group.$remove();

				for (var i in $scope.groups) {
					if ($scope.groups [i] === group) {
						$scope.groups.splice(i, 1);
					}
				}
			} else {
				$scope.group.$remove(function() {
					$location.path('groups');
				});
			}
		};

		// Update existing Group
		$scope.update = function() {
			var group = $scope.group;
			group.studentsList = $scope.studentsSelectedList;
			
			group.$update(function() {
				$location.path('groups/' + group._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Groups
		$scope.find = function() {
			$scope.groups = Groups.query();
		};

		// Find existing Group
		$scope.findOne = function() {
			Groups.get({ 
				groupId: $stateParams.groupId
			},function(group){
				$scope.group = group;
				$scope.getAllStudentsWrapperList();
			});
		};
	}
]);