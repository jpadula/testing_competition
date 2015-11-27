'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'testing-competition';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils','permission','isteven-multi-select','ngTable','chart.js'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('competitions');
'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('countries');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('groups');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('logs');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');

function hasRol(rol,roles) {
	var result = false;
	if (roles){
		for (var i = roles.length - 1; i >= 0; i--) {
			if (roles[i]===rol){
				result = true;
				break;
			}
		};
	}
	return result;
}

angular.module('users').run(["Authentication", "$q", "Permission", function (Authentication, $q, Permission) {
	var roles = Authentication.user.roles;
	//window.location.reload();
	Permission
	//for admin
    .defineRole('user', function (stateParams) {
		return hasRol("user",roles);
	})
    //for admin
    .defineRole('admin', function (stateParams) {
		return hasRol("admin",roles);
	});
}]);
'use strict';

// Configuring the Competitions module
angular.module('competitions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Competitions', 'competitions', 'dropdown', '/competitions(/create)?',true,["admin"]);
		Menus.addSubMenuItem('topbar', 'competitions', 'Show Competitions', 'competitions');
		Menus.addSubMenuItem('topbar', 'competitions', 'New Competition', 'competitions/create');
		
		// My Competitions for User
		Menus.addMenuItem('topbar', 'Competitions', 'my_competitions', 'dropdown', '',true,["user"]);
		Menus.addSubMenuItem('topbar', 'my_competitions', 'Show Competitions', 'my_competitions');

	}
]);
'use strict';

//Setting up route
angular.module('competitions').config(['$stateProvider',
	function($stateProvider) {
		// Competitions state routing
		$stateProvider.
		state('listCompetitions', {
			url: '/competitions',
			templateUrl: 'modules/competitions/views/list-competitions.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('createCompetition', {
			url: '/competitions/create',
			templateUrl: 'modules/competitions/views/create-competition.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('viewCompetition', {
			url: '/competitions/:competitionId',
			templateUrl: 'modules/competitions/views/view-competition.client.view.html',
			data: {
        		permissions: {
          			only: ['admin','user'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('reportBug', {
			url: '/competitions/:competitionId/reportBug',
			templateUrl: 'modules/competitions/views/create-bug.client.view.html',
			data: {
        		permissions: {
          			only: ['admin','user'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('allBugs', {
			url: '/competitions/:competitionId/allBugs',
			templateUrl: 'modules/competitions/views/list-bugs.client.view.html',
			data: {
        		permissions: {
          			only: ['admin','user'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('bugProfile', {
			url: '/competitions/:competitionId/allBugs/:bugId',
			templateUrl: 'modules/competitions/views/profile-bug.client.view.html',
			data: {
        		permissions: {
          			only: ['admin','user'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('myGroupBugs', {
			url: '/competitions/:competitionId/myGroupBugs',
			templateUrl: 'modules/competitions/views/list-my-open-bugs.client.view.html',
			data: {
        		permissions: {
          			only: ['admin','user'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('usersRanking', {
			url: '/competitions/:competitionId/usersRanking',
			templateUrl: 'modules/competitions/views/datatable-users-ranking.client.view.html',
			data: {
        		permissions: {
          			only: ['admin','user'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('groupsRanking', {
			url: '/competitions/:competitionId/groupsRanking',
			templateUrl: 'modules/competitions/views/datatable-groups-ranking.client.view.html',
			data: {
        		permissions: {
          			only: ['admin','user'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('groupsWithMoreBugsRanking', {
			url: '/competitions/:competitionId/groupsWithMoreBugsRanking',
			templateUrl: 'modules/competitions/views/datatable-groups-with-more-bugs-ranking.client.view.html',
			data: {
        		permissions: {
          			only: ['admin','user'],
          			redirectTo: 'home'
        		}
      		}
		}).



		state('editCompetition', {
			url: '/competitions/:competitionId/edit',
			templateUrl: 'modules/competitions/views/edit-competition.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('listMyCompetitions', {
			url: '/my_competitions',
			templateUrl: 'modules/competitions/views/my-competitions-list.view.html',
			data: {
        		permissions: {
          			only: ['user'],
          			redirectTo: 'home'
        		}
      		}
		});
	}
]);
'use strict';

// Competitions controller
angular.module('competitions').controller('CompetitionsController', ['$scope', '$stateParams', '$location','$q', 'Authentication', 'Competitions','Bugs','Groups','NgTableParams','$rootScope',
	function($scope, $stateParams, $location,$q, Authentication, Competitions,Bugs,Groups,NgTableParams,$rootScope) {
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
				$rootScope.$broadcast('clickOnCompetition', {
					"competitionID":$stateParams.competitionId,
					"showMenues":true,
					"competitionName":competition.name
				});
				$scope.competition = competition;
				$rootScope.competition = competition;
				$scope.getAllGroupsWrapperList();
				$scope.getGroups();
			},function(err){
				console.log(err);
				$location.path('/');
			});
		};
	}
]);
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
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus','$rootScope',
	function($scope, Authentication, Menus,$rootScope) {
		
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		$scope.clickedOnCompetition = false;
		$scope.competitionID = null;
		$scope.competitionName = null;
		$rootScope.$on('clickOnCompetition',function(req,msg){
			$scope.clickedOnCompetition = msg.showMenues;
			$scope.competitionID = msg.competitionID;
			$scope.competitionName = msg.competitionName
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
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		
	}
]);
/* 
 * Angular JS Multi Select
 * Creates a dropdown-like button with checkboxes. 
 *
 * Project started on: Tue, 14 Jan 2014 - 5:18:02 PM
 * Current version: 4.0.0
 * 
 * Released under the MIT License
 * --------------------------------------------------------------------------------
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Ignatius Steven (https://github.com/isteven)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions: 
 *
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
 * SOFTWARE.
 * --------------------------------------------------------------------------------
 */

'use strict'

angular.module( 'isteven-multi-select', ['ng'] ).directive( 'istevenMultiSelect' , [ '$sce', '$timeout', '$templateCache', function ( $sce, $timeout, $templateCache ) {
    return {
        restrict: 
            'AE',

        scope: 
        {   
            // models
            inputModel      : '=',
            outputModel     : '=',

            // settings based on attribute
            isDisabled      : '=',

            // callbacks
            onClear         : '&',  
            onClose         : '&',
            onSearchChange  : '&',  
            onItemClick     : '&',            
            onOpen          : '&', 
            onReset         : '&',  
            onSelectAll     : '&',  
            onSelectNone    : '&',  

            // i18n
            translation     : '='   
        },
        
        /* 
         * The rest are attributes. They don't need to be parsed / binded, so we can safely access them by value.
         * - buttonLabel, directiveId, helperElements, itemLabel, maxLabels, orientation, selectionMode, minSearchLength,
         *   tickProperty, disableProperty, groupProperty, searchProperty, maxHeight, outputProperties
         */
                                                         
         templateUrl: 
            'isteven-multi-select.htm',                            

        link: function ( $scope, element, attrs ) {                       

            $scope.backUp           = [];
            $scope.varButtonLabel   = '';               
            $scope.spacingProperty  = '';
            $scope.indexProperty    = '';                        
            $scope.orientationH     = false;
            $scope.orientationV     = true;
            $scope.filteredModel    = [];
            $scope.inputLabel       = { labelFilter: '' };                        
            $scope.tabIndex         = 0;            
            $scope.lang             = {};
            $scope.helperStatus     = {
                all     : true,
                none    : true,
                reset   : true,
                filter  : true
            };

            var 
                prevTabIndex        = 0,
                helperItems         = [],
                helperItemsLength   = 0,
                checkBoxLayer       = '',
                scrolled            = false,
                selectedItems       = [],
                formElements        = [],
                vMinSearchLength    = 0,
                clickedItem         = null                

            // v3.0.0
            // clear button clicked
            $scope.clearClicked = function( e ) {                
                $scope.inputLabel.labelFilter = '';
                $scope.updateFilter();
                $scope.select( 'clear', e );                
            }

            // A little hack so that AngularJS ng-repeat can loop using start and end index like a normal loop
            // http://stackoverflow.com/questions/16824853/way-to-ng-repeat-defined-number-of-times-instead-of-repeating-over-array
            $scope.numberToArray = function( num ) {
                return new Array( num );   
            }

            // Call this function when user type on the filter field
            $scope.searchChanged = function() {                                                
                if ( $scope.inputLabel.labelFilter.length < vMinSearchLength && $scope.inputLabel.labelFilter.length > 0 ) {
                    return false;
                }                
                $scope.updateFilter();
            }

            $scope.updateFilter = function()
            {      
                // we check by looping from end of input-model
                $scope.filteredModel = [];
                var i = 0;

                if ( typeof $scope.inputModel === 'undefined' ) {
                    return false;                   
                }

                for( i = $scope.inputModel.length - 1; i >= 0; i-- ) {

                    // if it's group end, we push it to filteredModel[];
                    if ( typeof $scope.inputModel[ i ][ attrs.groupProperty ] !== 'undefined' && $scope.inputModel[ i ][ attrs.groupProperty ] === false ) {
                        $scope.filteredModel.push( $scope.inputModel[ i ] );
                    }
                    
                    // if it's data 
                    var gotData = false;
                    if ( typeof $scope.inputModel[ i ][ attrs.groupProperty ] === 'undefined' ) {                        
                        
                        // If we set the search-key attribute, we use this loop. 
                        if ( typeof attrs.searchProperty !== 'undefined' && attrs.searchProperty !== '' ) {

                            for (var key in $scope.inputModel[ i ]  ) {
                                if ( 
                                    typeof $scope.inputModel[ i ][ key ] !== 'boolean'
                                    && String( $scope.inputModel[ i ][ key ] ).toUpperCase().indexOf( $scope.inputLabel.labelFilter.toUpperCase() ) >= 0                                     
                                    && attrs.searchProperty.indexOf( key ) > -1
                                ) {
                                    gotData = true;
                                    break;
                                }
                            }                        
                        }
                        // if there's no search-key attribute, we use this one. Much better on performance.
                        else {
                            for ( var key in $scope.inputModel[ i ]  ) {
                                if ( 
                                    typeof $scope.inputModel[ i ][ key ] !== 'boolean'
                                    && String( $scope.inputModel[ i ][ key ] ).toUpperCase().indexOf( $scope.inputLabel.labelFilter.toUpperCase() ) >= 0                                     
                                ) {
                                    gotData = true;
                                    break;
                                }
                            }                        
                        }

                        if ( gotData === true ) {    
                            // push
                            $scope.filteredModel.push( $scope.inputModel[ i ] );
                        }
                    }

                    // if it's group start
                    if ( typeof $scope.inputModel[ i ][ attrs.groupProperty ] !== 'undefined' && $scope.inputModel[ i ][ attrs.groupProperty ] === true ) {

                        if ( typeof $scope.filteredModel[ $scope.filteredModel.length - 1 ][ attrs.groupProperty ] !== 'undefined' 
                                && $scope.filteredModel[ $scope.filteredModel.length - 1 ][ attrs.groupProperty ] === false ) {
                            $scope.filteredModel.pop();
                        }
                        else {
                            $scope.filteredModel.push( $scope.inputModel[ i ] );
                        }
                    }
                }                

                $scope.filteredModel.reverse();  
                
                $timeout( function() {                    

                    $scope.getFormElements();               
                    
                    // Callback: on filter change                      
                    if ( $scope.inputLabel.labelFilter.length > vMinSearchLength ) {

                        var filterObj = [];

                        angular.forEach( $scope.filteredModel, function( value, key ) {
                            if ( typeof value !== 'undefined' ) {                   
                                if ( typeof value[ attrs.groupProperty ] === 'undefined' ) {                                                                    
                                    var tempObj = angular.copy( value );
                                    var index = filterObj.push( tempObj );                                
                                    delete filterObj[ index - 1 ][ $scope.indexProperty ];
                                    delete filterObj[ index - 1 ][ $scope.spacingProperty ];      
                                }
                            }
                        });

                        $scope.onSearchChange({ 
                            data: 
                            {
                                keyword: $scope.inputLabel.labelFilter, 
                                result: filterObj 
                            } 
                        });
                    }
                },0);
            };

            // List all the input elements. We need this for our keyboard navigation.
            // This function will be called everytime the filter is updated. 
            // Depending on the size of filtered mode, might not good for performance, but oh well..
            $scope.getFormElements = function() {                                     
                formElements = [];

                var 
                    selectButtons   = [],
                    inputField      = [],
                    checkboxes      = [],
                    clearButton     = [];
                
                // If available, then get select all, select none, and reset buttons
                if ( $scope.helperStatus.all || $scope.helperStatus.none || $scope.helperStatus.reset ) {                                                       
                    selectButtons = element.children().children().next().children().children()[ 0 ].getElementsByTagName( 'button' );                    
                    // If available, then get the search box and the clear button
                    if ( $scope.helperStatus.filter ) {                                            
                        // Get helper - search and clear button. 
                        inputField =    element.children().children().next().children().children().next()[ 0 ].getElementsByTagName( 'input' );                    
                        clearButton =   element.children().children().next().children().children().next()[ 0 ].getElementsByTagName( 'button' );                        
                    }
                }
                else {
                    if ( $scope.helperStatus.filter ) {   
                        // Get helper - search and clear button. 
                        inputField =    element.children().children().next().children().children()[ 0 ].getElementsByTagName( 'input' );                    
                        clearButton =   element.children().children().next().children().children()[ 0 ].getElementsByTagName( 'button' );
                    }
                }
               
                // Get checkboxes
                if ( !$scope.helperStatus.all && !$scope.helperStatus.none && !$scope.helperStatus.reset && !$scope.helperStatus.filter ) {
                    checkboxes = element.children().children().next()[ 0 ].getElementsByTagName( 'input' );
                }
                else {
                    checkboxes = element.children().children().next().children().next()[ 0 ].getElementsByTagName( 'input' );
                }

                // Push them into global array formElements[] 
                for ( var i = 0; i < selectButtons.length ; i++ )   { formElements.push( selectButtons[ i ] );  }
                for ( var i = 0; i < inputField.length ; i++ )      { formElements.push( inputField[ i ] );     }
                for ( var i = 0; i < clearButton.length ; i++ )     { formElements.push( clearButton[ i ] );    }
                for ( var i = 0; i < checkboxes.length ; i++ )      { formElements.push( checkboxes[ i ] );     }                                
            }            

            // check if an item has attrs.groupProperty (be it true or false)
            $scope.isGroupMarker = function( item , type ) {
                if ( typeof item[ attrs.groupProperty ] !== 'undefined' && item[ attrs.groupProperty ] === type ) return true; 
                return false;
            }

            $scope.removeGroupEndMarker = function( item ) {
                if ( typeof item[ attrs.groupProperty ] !== 'undefined' && item[ attrs.groupProperty ] === false ) return false; 
                return true;
            }                       

            // call this function when an item is clicked
            $scope.syncItems = function( item, e, ng_repeat_index ) {                                      

                e.preventDefault();
                e.stopPropagation();

                // if the directive is globaly disabled, do nothing
                if ( typeof attrs.disableProperty !== 'undefined' && item[ attrs.disableProperty ] === true ) {                                        
                    return false;
                }

                // if item is disabled, do nothing
                if ( typeof attrs.isDisabled !== 'undefined' && $scope.isDisabled === true ) {                        
                    return false;
                }                                

                // if end group marker is clicked, do nothing
                if ( typeof item[ attrs.groupProperty ] !== 'undefined' && item[ attrs.groupProperty ] === false ) {
                    return false;
                }                

                var index = $scope.filteredModel.indexOf( item );       

                // if the start of group marker is clicked ( only for multiple selection! )
                // how it works:
                // - if, in a group, there are items which are not selected, then they all will be selected
                // - if, in a group, all items are selected, then they all will be de-selected                
                if ( typeof item[ attrs.groupProperty ] !== 'undefined' && item[ attrs.groupProperty ] === true ) {                                  

                    // this is only for multiple selection, so if selection mode is single, do nothing
                    if ( typeof attrs.selectionMode !== 'undefined' && attrs.selectionMode.toUpperCase() === 'SINGLE' ) {
                        return false;
                    }
                    
                    var i,j,k;
                    var startIndex = 0;
                    var endIndex = $scope.filteredModel.length - 1;
                    var tempArr = [];

                    // nest level is to mark the depth of the group.
                    // when you get into a group (start group marker), nestLevel++
                    // when you exit a group (end group marker), nextLevel--
                    var nestLevel = 0;                    

                    // we loop throughout the filtered model (not whole model)
                    for( i = index ; i < $scope.filteredModel.length ; i++) {  

                        // this break will be executed when we're done processing each group
                        if ( nestLevel === 0 && i > index ) 
                        {
                            break;
                        }
                    
                        if ( typeof $scope.filteredModel[ i ][ attrs.groupProperty ] !== 'undefined' && $scope.filteredModel[ i ][ attrs.groupProperty ] === true ) {
                            
                            // To cater multi level grouping
                            if ( tempArr.length === 0 ) {
                                startIndex = i + 1; 
                            }                            
                            nestLevel = nestLevel + 1;
                        }                                                

                        // if group end
                        else if ( typeof $scope.filteredModel[ i ][ attrs.groupProperty ] !== 'undefined' && $scope.filteredModel[ i ][ attrs.groupProperty ] === false ) {

                            nestLevel = nestLevel - 1;                            

                            // cek if all are ticked or not                            
                            if ( tempArr.length > 0 && nestLevel === 0 ) {                                

                                var allTicked = true;       

                                endIndex = i;

                                for ( j = 0; j < tempArr.length ; j++ ) {                                
                                    if ( typeof tempArr[ j ][ $scope.tickProperty ] !== 'undefined' &&  tempArr[ j ][ $scope.tickProperty ] === false ) {
                                        allTicked = false;
                                        break;
                                    }
                                }                                                                                    

                                if ( allTicked === true ) {
                                    for ( j = startIndex; j <= endIndex ; j++ ) {
                                        if ( typeof $scope.filteredModel[ j ][ attrs.groupProperty ] === 'undefined' ) {
                                            if ( typeof attrs.disableProperty === 'undefined' ) {
                                                $scope.filteredModel[ j ][ $scope.tickProperty ] = false;
                                                // we refresh input model as well
                                                inputModelIndex = $scope.filteredModel[ j ][ $scope.indexProperty ];
                                                $scope.inputModel[ inputModelIndex ][ $scope.tickProperty ] = false;
                                            }
                                            else if ( $scope.filteredModel[ j ][ attrs.disableProperty ] !== true ) {
                                                $scope.filteredModel[ j ][ $scope.tickProperty ] = false;
                                                // we refresh input model as well
                                                inputModelIndex = $scope.filteredModel[ j ][ $scope.indexProperty ];
                                                $scope.inputModel[ inputModelIndex ][ $scope.tickProperty ] = false;
                                            }
                                        }
                                    }                                
                                }

                                else {
                                    for ( j = startIndex; j <= endIndex ; j++ ) {
                                        if ( typeof $scope.filteredModel[ j ][ attrs.groupProperty ] === 'undefined' ) {
                                            if ( typeof attrs.disableProperty === 'undefined' ) {
                                                $scope.filteredModel[ j ][ $scope.tickProperty ] = true;                                                
                                                // we refresh input model as well
                                                inputModelIndex = $scope.filteredModel[ j ][ $scope.indexProperty ];
                                                $scope.inputModel[ inputModelIndex ][ $scope.tickProperty ] = true;

                                            }                                            
                                            else if ( $scope.filteredModel[ j ][ attrs.disableProperty ] !== true ) {
                                                $scope.filteredModel[ j ][ $scope.tickProperty ] = true;
                                                // we refresh input model as well
                                                inputModelIndex = $scope.filteredModel[ j ][ $scope.indexProperty ];
                                                $scope.inputModel[ inputModelIndex ][ $scope.tickProperty ] = true;
                                            }
                                        }
                                    }                                
                                }                                                                                    
                            }
                        }
            
                        // if data
                        else {                            
                            tempArr.push( $scope.filteredModel[ i ] );                                                                                    
                        }
                    }                                 
                }

                // if an item (not group marker) is clicked
                else {

                    // If it's single selection mode
                    if ( typeof attrs.selectionMode !== 'undefined' && attrs.selectionMode.toUpperCase() === 'SINGLE' ) {
                        
                        // first, set everything to false
                        for( i=0 ; i < $scope.filteredModel.length ; i++) {                            
                            $scope.filteredModel[ i ][ $scope.tickProperty ] = false;                            
                        }        
                        for( i=0 ; i < $scope.inputModel.length ; i++) {                            
                            $scope.inputModel[ i ][ $scope.tickProperty ] = false;                            
                        }        
                        
                        // then set the clicked item to true
                        $scope.filteredModel[ index ][ $scope.tickProperty ] = true;                                                                 
                    }   

                    // Multiple
                    else {
                        $scope.filteredModel[ index ][ $scope.tickProperty ]   = !$scope.filteredModel[ index ][ $scope.tickProperty ];
                    }

                    // we refresh input model as well
                    var inputModelIndex = $scope.filteredModel[ index ][ $scope.indexProperty ];                                        
                    $scope.inputModel[ inputModelIndex ][ $scope.tickProperty ] = $scope.filteredModel[ index ][ $scope.tickProperty ];                    
                }                                  

                // we execute the callback function here
                clickedItem = angular.copy( item );                                                    
                if ( clickedItem !== null ) {                        
                    $timeout( function() {
                        delete clickedItem[ $scope.indexProperty ];
                        delete clickedItem[ $scope.spacingProperty ];      
                        $scope.onItemClick( { data: clickedItem } );
                        clickedItem = null;                    
                    }, 0 );                                                 
                }                                    
                
                $scope.refreshOutputModel();
                $scope.refreshButton();                              

                // We update the index here
                prevTabIndex = $scope.tabIndex;
                $scope.tabIndex = ng_repeat_index + helperItemsLength;
                                
                // Set focus on the hidden checkbox 
                e.target.focus();

                // set & remove CSS style
                $scope.removeFocusStyle( prevTabIndex );
                $scope.setFocusStyle( $scope.tabIndex );

                if ( typeof attrs.selectionMode !== 'undefined' && attrs.selectionMode.toUpperCase() === 'SINGLE' ) {
                    // on single selection mode, we then hide the checkbox layer
                    $scope.toggleCheckboxes( e );       
                }
            }     

            // update $scope.outputModel
            $scope.refreshOutputModel = function() {            
                
                $scope.outputModel  = [];
                var 
                    outputProps     = [],
                    tempObj         = {};

                // v4.0.0
                if ( typeof attrs.outputProperties !== 'undefined' ) {                    
                    outputProps = attrs.outputProperties.split(' ');                
                    angular.forEach( $scope.inputModel, function( value, key ) {                    
                        if ( 
                            typeof value !== 'undefined' 
                            && typeof value[ attrs.groupProperty ] === 'undefined' 
                            && value[ $scope.tickProperty ] === true 
                        ) {
                            tempObj         = {};
                            angular.forEach( value, function( value1, key1 ) {                                
                                if ( outputProps.indexOf( key1 ) > -1 ) {                                                                         
                                    tempObj[ key1 ] = value1;                                    
                                }
                            });
                            var index = $scope.outputModel.push( tempObj );                                                               
                            delete $scope.outputModel[ index - 1 ][ $scope.indexProperty ];
                            delete $scope.outputModel[ index - 1 ][ $scope.spacingProperty ];                                      
                        }
                    });         
                }
                else {
                    angular.forEach( $scope.inputModel, function( value, key ) {                    
                        if ( 
                            typeof value !== 'undefined' 
                            && typeof value[ attrs.groupProperty ] === 'undefined' 
                            && value[ $scope.tickProperty ] === true 
                        ) {
                            var temp = angular.copy( value );
                            var index = $scope.outputModel.push( temp );                                                               
                            delete $scope.outputModel[ index - 1 ][ $scope.indexProperty ];
                            delete $scope.outputModel[ index - 1 ][ $scope.spacingProperty ];                                      
                        }
                    });         
                }
            }

            // refresh button label
            $scope.refreshButton = function() {

                $scope.varButtonLabel   = '';                
                var ctr                 = 0;                  

                // refresh button label...
                if ( $scope.outputModel.length === 0 ) {
                    // https://github.com/isteven/angular-multi-select/pull/19                    
                    $scope.varButtonLabel = $scope.lang.nothingSelected;
                }
                else {                
                    var tempMaxLabels = $scope.outputModel.length;
                    if ( typeof attrs.maxLabels !== 'undefined' && attrs.maxLabels !== '' ) {
                        tempMaxLabels = attrs.maxLabels;
                    }

                    // if max amount of labels displayed..
                    if ( $scope.outputModel.length > tempMaxLabels ) {
                        $scope.more = true;
                    }
                    else {
                        $scope.more = false;
                    }                
                    
                    angular.forEach( $scope.inputModel, function( value, key ) {
                        if ( typeof value !== 'undefined' && value[ attrs.tickProperty ] === true ) {                        
                            if ( ctr < tempMaxLabels ) {                            
                                $scope.varButtonLabel += ( $scope.varButtonLabel.length > 0 ? '</div>, <div class="buttonLabel">' : '<div class="buttonLabel">') + $scope.writeLabel( value, 'buttonLabel' );
                            }
                            ctr++;
                        }
                    });                

                    if ( $scope.more === true ) {
                        // https://github.com/isteven/angular-multi-select/pull/16
                        if (tempMaxLabels > 0) {
                            $scope.varButtonLabel += ', ... ';
                        }
                        $scope.varButtonLabel += '(' + $scope.outputModel.length + ')';                        
                    }
                }
                $scope.varButtonLabel = $sce.trustAsHtml( $scope.varButtonLabel + '<span class="caret"></span>' );                
            }

            // Check if a checkbox is disabled or enabled. It will check the granular control (disableProperty) and global control (isDisabled)
            // Take note that the granular control has higher priority.
            $scope.itemIsDisabled = function( item ) {
                
                if ( typeof attrs.disableProperty !== 'undefined' && item[ attrs.disableProperty ] === true ) {                                        
                    return true;
                }
                else {             
                    if ( $scope.isDisabled === true ) {                        
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                
            }

            // A simple function to parse the item label settings. Used on the buttons and checkbox labels.
            $scope.writeLabel = function( item, type ) {
                
                // type is either 'itemLabel' or 'buttonLabel'
                var temp    = attrs[ type ].split( ' ' );                    
                var label   = '';                

                angular.forEach( temp, function( value, key ) {                    
                    item[ value ] && ( label += '&nbsp;' + value.split( '.' ).reduce( function( prev, current ) {
                        return prev[ current ]; 
                    }, item ));        
                });
                
                if ( type.toUpperCase() === 'BUTTONLABEL' ) {                    
                    return label;
                }
                return $sce.trustAsHtml( label );
            }                                

            // UI operations to show/hide checkboxes based on click event..
            $scope.toggleCheckboxes = function( e ) {                                    
                
                // We grab the button
                var clickedEl = element.children()[0];

                // Just to make sure.. had a bug where key events were recorded twice
                angular.element( document ).off( 'click', $scope.externalClickListener );
                angular.element( document ).off( 'keydown', $scope.keyboardListener );        

                // The idea below was taken from another multi-select directive - https://github.com/amitava82/angular-multiselect 
                // His version is awesome if you need a more simple multi-select approach.                                

                // close
                if ( angular.element( checkBoxLayer ).hasClass( 'show' )) {                         

                    angular.element( checkBoxLayer ).removeClass( 'show' );                    
                    angular.element( clickedEl ).removeClass( 'buttonClicked' );                    
                    angular.element( document ).off( 'click', $scope.externalClickListener );
                    angular.element( document ).off( 'keydown', $scope.keyboardListener );                                    

                    // clear the focused element;
                    $scope.removeFocusStyle( $scope.tabIndex );
                    if ( typeof formElements[ $scope.tabIndex ] !== 'undefined' ) {
                        formElements[ $scope.tabIndex ].blur();
                    }

                    // close callback
                    $timeout( function() {
                        $scope.onClose();
                    }, 0 );

                    // set focus on button again
                    element.children().children()[ 0 ].focus();
                } 
                // open
                else                 
                {    
                    // clear filter
                    $scope.inputLabel.labelFilter = '';                
                    $scope.updateFilter();                                

                    helperItems = [];
                    helperItemsLength = 0;

                    angular.element( checkBoxLayer ).addClass( 'show' );
                    angular.element( clickedEl ).addClass( 'buttonClicked' );       

                    // Attach change event listener on the input filter. 
                    // We need this because ng-change is apparently not an event listener.                    
                    angular.element( document ).on( 'click', $scope.externalClickListener );
                    angular.element( document ).on( 'keydown', $scope.keyboardListener );  

                    // to get the initial tab index, depending on how many helper elements we have. 
                    // priority is to always focus it on the input filter                                                                
                    $scope.getFormElements();
                    $scope.tabIndex = 0;

                    var helperContainer = angular.element( element[ 0 ].querySelector( '.helperContainer' ) )[0];                
                    
                    if ( typeof helperContainer !== 'undefined' ) {
                        for ( var i = 0; i < helperContainer.getElementsByTagName( 'BUTTON' ).length ; i++ ) {
                            helperItems[ i ] = helperContainer.getElementsByTagName( 'BUTTON' )[ i ];
                        }
                        helperItemsLength = helperItems.length + helperContainer.getElementsByTagName( 'INPUT' ).length;
                    }
                    
                    // focus on the filter element on open. 
                    if ( element[ 0 ].querySelector( '.inputFilter' ) ) {                        
                        element[ 0 ].querySelector( '.inputFilter' ).focus();    
                        $scope.tabIndex = $scope.tabIndex + helperItemsLength - 2;
                        // blur button in vain
                        angular.element( element ).children()[ 0 ].blur();
                    }
                    // if there's no filter then just focus on the first checkbox item
                    else {                  
                        if ( !$scope.isDisabled ) {                        
                            $scope.tabIndex = $scope.tabIndex + helperItemsLength;
                            if ( $scope.inputModel.length > 0 ) {
                                formElements[ $scope.tabIndex ].focus();
                                $scope.setFocusStyle( $scope.tabIndex );
                                // blur button in vain
                                angular.element( element ).children()[ 0 ].blur();
                            }                            
                        }
                    }                          

                    // open callback
                    $scope.onOpen();
                }                            
            }
            
            // handle clicks outside the button / multi select layer
            $scope.externalClickListener = function( e ) {                   

                var targetsArr = element.find( e.target.tagName );
                for (var i = 0; i < targetsArr.length; i++) {                                        
                    if ( e.target == targetsArr[i] ) {
                        return;
                    }
                }

                angular.element( checkBoxLayer.previousSibling ).removeClass( 'buttonClicked' );                    
                angular.element( checkBoxLayer ).removeClass( 'show' );
                angular.element( document ).off( 'click', $scope.externalClickListener ); 
                angular.element( document ).off( 'keydown', $scope.keyboardListener );                
                
                // close callback                
                $timeout( function() {
                    $scope.onClose();
                }, 0 );

                // set focus on button again
                element.children().children()[ 0 ].focus();
            }
   
            // select All / select None / reset buttons
            $scope.select = function( type, e ) {

                var helperIndex = helperItems.indexOf( e.target );
                $scope.tabIndex = helperIndex;

                switch( type.toUpperCase() ) {
                    case 'ALL':
                        angular.forEach( $scope.filteredModel, function( value, key ) {                            
                            if ( typeof value !== 'undefined' && value[ attrs.disableProperty ] !== true ) {                                
                                if ( typeof value[ attrs.groupProperty ] === 'undefined' ) {                                
                                    value[ $scope.tickProperty ] = true;
                                }
                            }
                        });                            
                        $scope.refreshOutputModel();                                    
                        $scope.refreshButton();                                                  
                        $scope.onSelectAll();                                                
                        break;
                    case 'NONE':
                        angular.forEach( $scope.filteredModel, function( value, key ) {
                            if ( typeof value !== 'undefined' && value[ attrs.disableProperty ] !== true ) {                        
                                if ( typeof value[ attrs.groupProperty ] === 'undefined' ) {                                
                                    value[ $scope.tickProperty ] = false;
                                }
                            }
                        });               
                        $scope.refreshOutputModel();                                    
                        $scope.refreshButton();                                                                          
                        $scope.onSelectNone();                        
                        break;
                    case 'RESET':            
                        angular.forEach( $scope.filteredModel, function( value, key ) {                            
                            if ( typeof value[ attrs.groupProperty ] === 'undefined' && typeof value !== 'undefined' && value[ attrs.disableProperty ] !== true ) {                        
                                var temp = value[ $scope.indexProperty ];                                
                                value[ $scope.tickProperty ] = $scope.backUp[ temp ][ $scope.tickProperty ];
                            }
                        });               
                        $scope.refreshOutputModel();                                    
                        $scope.refreshButton();                                                                          
                        $scope.onReset();                        
                        break;
                    case 'CLEAR':
                        $scope.tabIndex = $scope.tabIndex + 1;
                        $scope.onClear();    
                        break;
                    case 'FILTER':                        
                        $scope.tabIndex = helperItems.length - 1;
                        break;
                    default:                        
                }                                                                                 
            }            

            // just to create a random variable name                
            function genRandomString( length ) {                
                var possible    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                var temp        = '';
                for( var i=0; i < length; i++ ) {
                     temp += possible.charAt( Math.floor( Math.random() * possible.length ));
                }
                return temp;
            }

            // count leading spaces
            $scope.prepareGrouping = function() {
                var spacing     = 0;                                                
                angular.forEach( $scope.filteredModel, function( value, key ) {
                    value[ $scope.spacingProperty ] = spacing;                    
                    if ( value[ attrs.groupProperty ] === true ) {
                        spacing+=2;
                    }                    
                    else if ( value[ attrs.groupProperty ] === false ) {
                        spacing-=2;
                    }                 
                });
            }

            // prepare original index
            $scope.prepareIndex = function() {
                var ctr = 0;
                angular.forEach( $scope.filteredModel, function( value, key ) {
                    value[ $scope.indexProperty ] = ctr;
                    ctr++;
                });
            }

            // navigate using up and down arrow
            $scope.keyboardListener = function( e ) { 
                
                var key = e.keyCode ? e.keyCode : e.which;      
                var isNavigationKey = false;                                                

                // ESC key (close)
                if ( key === 27 ) {
                    e.preventDefault();                   
                    e.stopPropagation();
                    $scope.toggleCheckboxes( e );
                }                    
                
                
                // next element ( tab, down & right key )                    
                else if ( key === 40 || key === 39 || ( !e.shiftKey && key == 9 ) ) {                    
                    
                    isNavigationKey = true;
                    prevTabIndex = $scope.tabIndex; 
                    $scope.tabIndex++;                         
                    if ( $scope.tabIndex > formElements.length - 1 ) {
                        $scope.tabIndex = 0;
                        prevTabIndex = formElements.length - 1; 
                    }                                                            
                    while ( formElements[ $scope.tabIndex ].disabled === true ) {
                        $scope.tabIndex++;
                        if ( $scope.tabIndex > formElements.length - 1 ) {
                            $scope.tabIndex = 0;                            
                        }                                                                                    
                        if ( $scope.tabIndex === prevTabIndex ) {
                            break;
                        }
                    }              
                }
                  
                // prev element ( shift+tab, up & left key )
                else if ( key === 38 || key === 37 || ( e.shiftKey && key == 9 ) ) { 
                    isNavigationKey = true;
                    prevTabIndex = $scope.tabIndex; 
                    $scope.tabIndex--;                              
                    if ( $scope.tabIndex < 0 ) {
                        $scope.tabIndex = formElements.length - 1;
                        prevTabIndex = 0;
                    }                                         
                    while ( formElements[ $scope.tabIndex ].disabled === true ) {                        
                        $scope.tabIndex--;
                        if ( $scope.tabIndex === prevTabIndex ) {
                            break;
                        }                                            
                        if ( $scope.tabIndex < 0 ) {
                            $scope.tabIndex = formElements.length - 1;
                        }                             
                    }                                                     
                }                    

                if ( isNavigationKey === true ) {                                         
                    
                    e.preventDefault();

                    // set focus on the checkbox                    
                    formElements[ $scope.tabIndex ].focus();    
                    var actEl = document.activeElement;                     
                    
                    if ( actEl.type.toUpperCase() === 'CHECKBOX' ) {                                                   
                        $scope.setFocusStyle( $scope.tabIndex );
                        $scope.removeFocusStyle( prevTabIndex );
                    }                    
                    else {
                        $scope.removeFocusStyle( prevTabIndex );
                        $scope.removeFocusStyle( helperItemsLength );
                        $scope.removeFocusStyle( formElements.length - 1 );
                    } 
                }                

                isNavigationKey = false;
            }

            // set (add) CSS style on selected row
            $scope.setFocusStyle = function( tabIndex ) {                                
                angular.element( formElements[ tabIndex ] ).parent().parent().parent().addClass( 'multiSelectFocus' );                        
            }

            // remove CSS style on selected row
            $scope.removeFocusStyle = function( tabIndex ) {                
                angular.element( formElements[ tabIndex ] ).parent().parent().parent().removeClass( 'multiSelectFocus' );
            }

            /*********************
             *********************             
             *
             * 1) Initializations
             *
             *********************
             *********************/

            // attrs to $scope - attrs-$scope - attrs - $scope
            // Copy some properties that will be used on the template. They need to be in the $scope.
            $scope.groupProperty    = attrs.groupProperty;   
            $scope.tickProperty     = attrs.tickProperty;
            $scope.directiveId      = attrs.directiveId;
            
            // Unfortunately I need to add these grouping properties into the input model
            var tempStr = genRandomString( 5 );
            $scope.indexProperty = 'idx_' + tempStr;
            $scope.spacingProperty = 'spc_' + tempStr;         

            // set orientation css            
            if ( typeof attrs.orientation !== 'undefined' ) {

                if ( attrs.orientation.toUpperCase() === 'HORIZONTAL' ) {                    
                    $scope.orientationH = true;
                    $scope.orientationV = false;
                }
                else 
                {
                    $scope.orientationH = false;
                    $scope.orientationV = true;
                }
            }            

            // get elements required for DOM operation
            checkBoxLayer = element.children().children().next()[0];

            // set max-height property if provided
            if ( typeof attrs.maxHeight !== 'undefined' ) {                
                var layer = element.children().children().children()[0];
                angular.element( layer ).attr( "style", "height:" + attrs.maxHeight + "; overflow-y:scroll;" );                                
            }

            // some flags for easier checking            
            for ( var property in $scope.helperStatus ) {
                if ( $scope.helperStatus.hasOwnProperty( property )) {                    
                    if ( 
                        typeof attrs.helperElements !== 'undefined' 
                        && attrs.helperElements.toUpperCase().indexOf( property.toUpperCase() ) === -1 
                    ) {
                        $scope.helperStatus[ property ] = false;
                    }
                }
            }
            if ( typeof attrs.selectionMode !== 'undefined' && attrs.selectionMode.toUpperCase() === 'SINGLE' )  {
                $scope.helperStatus[ 'all' ] = false;
                $scope.helperStatus[ 'none' ] = false;
            }

            // helper button icons.. I guess you can use html tag here if you want to. 
            $scope.icon        = {};            
            $scope.icon.selectAll  = '&#10003;';    // a tick icon
            $scope.icon.selectNone = '&times;';     // x icon
            $scope.icon.reset      = '&#8630;';     // undo icon            
            // this one is for the selected items
            $scope.icon.tickMark   = '&#10003;';    // a tick icon 

            // configurable button labels                       
            if ( typeof attrs.translation !== 'undefined' ) {
                $scope.lang.selectAll       = $sce.trustAsHtml( $scope.icon.selectAll  + '&nbsp;&nbsp;' + $scope.translation.selectAll );
                $scope.lang.selectNone      = $sce.trustAsHtml( $scope.icon.selectNone + '&nbsp;&nbsp;' + $scope.translation.selectNone );
                $scope.lang.reset           = $sce.trustAsHtml( $scope.icon.reset      + '&nbsp;&nbsp;' + $scope.translation.reset );
                $scope.lang.search          = $scope.translation.search;                
                $scope.lang.nothingSelected = $sce.trustAsHtml( $scope.translation.nothingSelected );                
            }
            else {
                $scope.lang.selectAll       = $sce.trustAsHtml( $scope.icon.selectAll  + '&nbsp;&nbsp;Select All' );                
                $scope.lang.selectNone      = $sce.trustAsHtml( $scope.icon.selectNone + '&nbsp;&nbsp;Select None' );
                $scope.lang.reset           = $sce.trustAsHtml( $scope.icon.reset      + '&nbsp;&nbsp;Reset' );
                $scope.lang.search          = 'Search...';
                $scope.lang.nothingSelected = 'None Selected';                
            }
            $scope.icon.tickMark = $sce.trustAsHtml( $scope.icon.tickMark );
                
            // min length of keyword to trigger the filter function
            if ( typeof attrs.MinSearchLength !== 'undefined' && parseInt( attrs.MinSearchLength ) > 0 ) {
                vMinSearchLength = Math.floor( parseInt( attrs.MinSearchLength ) );
            }

            /*******************************************************
             *******************************************************
             *
             * 2) Logic starts here, initiated by watch 1 & watch 2
             *
             *******************************************************
             *******************************************************/
            
            // watch1, for changes in input model property
            // updates multi-select when user select/deselect a single checkbox programatically
            // https://github.com/isteven/angular-multi-select/issues/8
            
            var firstTimeWatch1 = true;
            var firstTimeWatch2 = true;

            $scope.$watch( 'inputModel' , function( newVal ) {
                if ( newVal ) {
                    if (firstTimeWatch1){
                        if (newVal[$scope.tickProperty] != undefined)
                            $scope.setDefaultTicketIfHasNot(newVal,false);
                        else
                            $scope.setDefaultTicketIfHasNot(newVal,true);
                        firstTimeWatch1=false;
                    }
                    $scope.refreshOutputModel();                                    
                    $scope.refreshButton();                                                  
                }
            }, true );
            
            // watch2 for changes in input model as a whole
            // this on updates the multi-select when a user load a whole new input-model. We also update the $scope.backUp variable
            $scope.$watch( 'inputModel' , function( newVal ) { 
                if ( newVal ) {
                    if (firstTimeWatch2){
                        if (newVal[$scope.tickProperty] != undefined)
                            $scope.setDefaultTicketIfHasNot(newVal,false);
                        else
                            $scope.setDefaultTicketIfHasNot(newVal,true);
                        firstTimeWatch2=false;
                    }
                    $scope.backUp = angular.copy( $scope.inputModel );    
                    $scope.updateFilter();
                    $scope.prepareGrouping();
                    $scope.prepareIndex();                                                              
                    $scope.refreshOutputModel();                
                    $scope.refreshButton();                                                                                                                 
                }
            });

            $scope.setDefaultTicketIfHasNot = function(newVal,defaultTicket) {
                for (var i = newVal.length - 1; i >= 0; i--) {
                    newVal[i][$scope.tickProperty] = defaultTicket;
                };
            }

            // watch for changes in directive state (disabled or enabled)
            $scope.$watch( 'isDisabled' , function( newVal ) {         
                $scope.isDisabled = newVal;                               
            });            
            
            // this is for touch enabled devices. We don't want to hide checkboxes on scroll. 
            var onTouchStart = function( e ) { 
            	$scope.$apply( function() {
            		$scope.scrolled = false;
            	}); 
            };
            angular.element( document ).bind( 'touchstart', onTouchStart);
            var onTouchMove = function( e ) { 
            	$scope.$apply( function() {
            		$scope.scrolled = true;                
            	});
            };
            angular.element( document ).bind( 'touchmove', onTouchMove);            

            // unbind document events to prevent memory leaks
            $scope.$on( '$destroy', function () {
			    angular.element( document ).unbind( 'touchstart', onTouchStart);
            	angular.element( document ).unbind( 'touchmove', onTouchMove);
            });
        }
    }
}]).run( [ '$templateCache' , function( $templateCache ) {
    var template = 
        '<span class="multiSelect inlineBlock">' +
            // main button
            '<button id="{{directiveId}}" type="button"' +                
                'ng-click="toggleCheckboxes( $event ); refreshSelectedItems(); refreshButton(); prepareGrouping; prepareIndex();"' +
                'ng-bind-html="varButtonLabel"' +
                'ng-disabled="disable-button"' +
            '>' +
            '</button>' +
            // overlay layer
            '<div class="checkboxLayer">' +
                // container of the helper elements
                '<div class="helperContainer" ng-if="helperStatus.filter || helperStatus.all || helperStatus.none || helperStatus.reset ">' +
                    // container of the first 3 buttons, select all, none and reset
                    '<div class="line" ng-if="helperStatus.all || helperStatus.none || helperStatus.reset ">' +
                        // select all
                        '<button type="button" class="helperButton"' +
                            'ng-disabled="isDisabled"' + 
                            'ng-if="helperStatus.all"' +
                            'ng-click="select( \'all\', $event );"' +
                            'ng-bind-html="lang.selectAll">' +
                        '</button>'+
                        // select none
                        '<button type="button" class="helperButton"' +
                            'ng-disabled="isDisabled"' + 
                            'ng-if="helperStatus.none"' +
                            'ng-click="select( \'none\', $event );"' +
                            'ng-bind-html="lang.selectNone">' +
                        '</button>'+
                        // reset
                        '<button type="button" class="helperButton reset"' +
                            'ng-disabled="isDisabled"' + 
                            'ng-if="helperStatus.reset"' +
                            'ng-click="select( \'reset\', $event );"' +
                            'ng-bind-html="lang.reset">'+
                        '</button>' +
                    '</div>' +
                    // the search box
                    '<div class="line" style="position:relative" ng-if="helperStatus.filter">'+
                        // textfield                
                        '<input placeholder="{{lang.search}}" type="text"' +
                            'ng-click="select( \'filter\', $event )" '+
                            'ng-model="inputLabel.labelFilter" '+
                            'ng-change="searchChanged()" class="inputFilter"'+
                            '/>'+
                        // clear button
                        '<button type="button" class="clearButton" ng-click="clearClicked( $event )" >×</button> '+
                    '</div> '+
                '</div> '+
                // selection items
                '<div class="checkBoxContainer">'+
                    '<div '+
                        'ng-repeat="item in filteredModel | filter:removeGroupEndMarker" class="multiSelectItem"'+
                        'ng-class="{selected: item[ tickProperty ], horizontal: orientationH, vertical: orientationV, multiSelectGroup:item[ groupProperty ], disabled:itemIsDisabled( item )}"'+
                        'ng-click="syncItems( item, $event, $index );" '+
                        'ng-mouseleave="removeFocusStyle( tabIndex );"> '+
                        // this is the spacing for grouped items
                        '<div class="acol" ng-if="item[ spacingProperty ] > 0" ng-repeat="i in numberToArray( item[ spacingProperty ] ) track by $index">'+                        
                    '</div>  '+        
                    '<div class="acol">'+
                        '<label>'+                                
                            // input, so that it can accept focus on keyboard click
                            '<input class="checkbox focusable" type="checkbox" '+
                                'ng-disabled="itemIsDisabled( item )" '+
                                'ng-checked="item[ tickProperty ]" '+
                                'ng-click="syncItems( item, $event, $index )" />'+
                            // item label using ng-bind-hteml
                            '<span '+
                                'ng-class="{disabled:itemIsDisabled( item )}" '+
                                'ng-bind-html="writeLabel( item, \'itemLabel\' )">'+
                            '</span>'+
                        '</label>'+
                    '</div>'+
                    // the tick/check mark
                    '<span class="tickMark" ng-if="item[ groupProperty ] !== true && item[ tickProperty ] === true" ng-bind-html="icon.tickMark"></span>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</span>';
	$templateCache.put( 'isteven-multi-select.htm' , template );
}]); 
'use strict';
angular.module('core').directive('ngConfirmClick', [
	function(){
	    return {
	        link: function (scope, element, attr) {
	            var msg = attr.ngConfirmClick || "Are you sure?";
	            var clickAction = attr.confirmedClick;
	            element.bind('click',function (event) {
	                if ( window.confirm(msg) ) {
	                    scope.$eval(clickAction)
	                }
	            });
	        }
	    };
 }]);
//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Configuring the Countries module
angular.module('countries').run(['Menus',
	function(Menus) {
		/*
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Countries', 'countries', 'dropdown', '/countries(/create)?',true,["admin"]);
		Menus.addSubMenuItem('topbar', 'countries', 'List Countries', 'countries');
		Menus.addSubMenuItem('topbar', 'countries', 'New Country', 'countries/create');
		*/
	}
]);
'use strict';

//Setting up route
angular.module('countries').config(['$stateProvider',
	function($stateProvider) {
		// Countries state routing
		$stateProvider.
		state('listCountries', {
			url: '/countries',
			templateUrl: 'modules/countries/views/list-countries.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('createCountry', {
			url: '/countries/create',
			templateUrl: 'modules/countries/views/create-country.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('viewCountry', {
			url: '/countries/:countryId',
			templateUrl: 'modules/countries/views/view-country.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('editCountry', {
			url: '/countries/:countryId/edit',
			templateUrl: 'modules/countries/views/edit-country.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		});
	}
]);
'use strict';

// Countries controller
angular.module('countries').controller('CountriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Countries',
	function($scope, $stateParams, $location, Authentication, Countries) {
		$scope.authentication = Authentication;

		// Create new Country
		$scope.create = function() {
			// Create new Country object
			var country = new Countries ({
				name: this.name
			});

			// Redirect after save
			country.$save(function(response) {
				$location.path('countries/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Country
		$scope.remove = function(country) {
			if ( country ) { 
				country.$remove();

				for (var i in $scope.countries) {
					if ($scope.countries [i] === country) {
						$scope.countries.splice(i, 1);
					}
				}
			} else {
				$scope.country.$remove(function() {
					$location.path('countries');
				});
			}
		};

		// Update existing Country
		$scope.update = function() {
			var country = $scope.country;

			country.$update(function() {
				$location.path('countries/' + country._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Countries
		$scope.find = function() {
			$scope.countries = Countries.query();
		};

		// Find existing Country
		$scope.findOne = function() {
			$scope.country = Countries.get({ 
				countryId: $stateParams.countryId
			});
		};
	}
]);
'use strict';

//Countries service used to communicate Countries REST endpoints
angular.module('countries').factory('Countries', ['$resource',
	function($resource) {
		return $resource('countries/:countryId', { countryId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Groups module
angular.module('groups').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Groups', 'groups', 'dropdown', '/groups(/create)?',true,["admin"]);
		Menus.addSubMenuItem('topbar', 'groups', 'Show Groups', 'groups');
		Menus.addSubMenuItem('topbar', 'groups', 'New Group', 'groups/create');
	}
]);
'use strict';

//Setting up route
angular.module('groups').config(['$stateProvider',
	function($stateProvider) {
		// Groups state routing
		$stateProvider.
		state('listGroups', {
			url: '/groups',
			templateUrl: 'modules/groups/views/list-groups.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('createGroup', {
			url: '/groups/create',
			templateUrl: 'modules/groups/views/create-group.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('viewGroup', {
			url: '/groups/:groupId',
			templateUrl: 'modules/groups/views/view-group.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		}).
		state('editGroup', {
			url: '/groups/:groupId/edit',
			templateUrl: 'modules/groups/views/edit-group.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		});
	}
]);
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
'use strict';

//Groups service used to communicate Groups REST endpoints
angular.module('groups').factory('Groups', ['$resource',
	function($resource) {
		return $resource('groups/:groupId', { groupId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Countries module
angular.module('logs').run(['Menus',
	function(Menus) {
		
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Logs', 'logs', 'item', '',true,["admin"]);
	}
]);
'use strict';

//Setting up route
angular.module('countries').config(['$stateProvider',
	function($stateProvider) {
		// Countries state routing
		$stateProvider.
		state('listLogs', {
			url: '/logs',
			templateUrl: 'modules/logs/views/list-logs.client.view.html',
			data: {
        		permissions: {
          			only: ['admin'],
          			redirectTo: 'home'
        		}
      		}
		})
	}
]);
'use strict';

// Logs controller
angular.module('logs').controller('LogsController', ['$scope', '$stateParams', '$location','NgTableParams','Authentication', 'Logs', 'StatsSrv',
	function($scope, $stateParams, $location,NgTableParams, Authentication, Logs, StatsSrv) {

    $scope.logAlerts = [];

    var fromDate = new Date("2015-11-24 10:00:00"); // TODO: refactor, to take a date from datepicker
    var untilDate = new Date();

    /**
     * Given a source array with data, the function adds to the graph array the property .labels
     * which contains the labels for the x-axis of the graph
     *
     * Requires: graphArray.labels must exist and graphArray.labels = []
     *
     * @param aSourceArray {Array} contains elements of form {_id: {year:, month:, day:}, count: }
     * @param aGraphObject {Object} has property 'labels' that is an empty array; will be filled by running this function
     */
    var addLabelsToGraph = function (aSourceArray, aGraphObject) {

      // names of month for the x-axis labels
      var monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

      // step-level defines if every data point on x-axis also get a label (default yes, thus value 1)
      var graphStepLevel = 1;
      // if x-axis has more than 20 points, not every point should get label
      // we recalculate the step-level based on number of points on x-axis
      if (aSourceArray.length > 20) {
        graphStepLevel = Math.ceil(aSourceArray.length / 20);
      }

      for (var i = 0; i < aSourceArray.length; i++) {
        if (i % graphStepLevel == 0) {
          // only set a labels at the graphStepLevel
          aGraphObject.labels.push(monthNames[aSourceArray[i]._id.month - 1] + " " + aSourceArray[i]._id.day);
        } else {
          aGraphObject.labels.push("");
        }
      }
    };

    /**
     * Adds a new line to the given graph object.
     * @param aSourceArray {Array} contains elements that contain property {count: }
     * @param aGraphObject {Object} has property 'data' that is an empty array;
     * function will push a new array as element that contains the y-data points for line
     */
    var addLineToGraph = function (aSourceArray, aGraphObject) {
      var dataNew = [];
      for (var i = 0; i < aSourceArray.length; i++) {
        dataNew.push(aSourceArray[i].count);
      }
      aGraphObject.data.push(dataNew);
    }

    /**
     * Displays the graph for number of compilations per day
     * Requires: $scope.compilerSummaryLogs has the data as {_id, count}
     */
    var drawSigninGraph = function () {

      // object containing the data for rendering the graph for compilation and runs
      $scope.singinGraph = {
        labels: [],
        series: [],
        data: []
      };

      // sort the array for signin logs and add the missing dates (which have a count of 0)
      StatsSrv.sortAndAddMissingDates(fromDate, untilDate, $scope.signinLogs);

      $scope.singinGraph.series.push('Sign in');
      addLineToGraph($scope.signinLogs, $scope.singinGraph);

      addLabelsToGraph($scope.signinLogs, $scope.singinGraph);
    };

    var drawReportBugGraph = function () {
      // object containing the data for rendering the graph for compilation and runs
      $scope.reportBugGraph = {
        labels: [],
        series: [],
        data: []
      };

      // sort the array for signin logs and add the missing dates (which have a count of 0)
      StatsSrv.sortAndAddMissingDates(fromDate, untilDate, $scope.reportBugLogs);

      $scope.reportBugGraph.series.push('Sign in');
      addLineToGraph($scope.reportBugLogs, $scope.reportBugGraph);

      addLabelsToGraph($scope.reportBugLogs, $scope.reportBugGraph);
    };

    /**
     * gets the data for signin and draws the graph
     */
    var getSigninDataForGraph = function () {
      $scope.isLoadingSigninGraphData = true;
      Logs.signinEvent(function(err,result){
        if (!err) {
          $scope.signinLogs = result;
          drawSigninGraph();
          $scope.isLoadingSigninGraphData = false;

        } else {
          //error
          $scope.logAlerts.push({type: "danger", msg:"Error loading signin logs" });
        }
      });
    };

    /**
     * Gets the data reportedBugs and draws the graphs
     */
    var getReportedBugsDataForGraph = function () {
      $scope.isLoadingReportedBugGraphData = true;
      Logs.reportBugEvent(function(err,result){
        if (!err) {
          $scope.reportBugLogs = result;
          drawReportBugGraph();
          $scope.isLoadingReportedBugGraphData = false;

        } else {
          //error
          $scope.logAlerts.push({type: "danger", msg:"Error loading signin logs" });
        }
      });
    };
    var getGoldMedalsDataForGraph = function () {

    };
    var getSilverMedalsDataForGraph = function () {

    };
    var getAcceptReportDataForGraph = function () {

    };
    var getRejectDataForGraph = function () {

    };

    /**
     * gets all the draw logs from the server
     */
    var getAllLogsData = function () {
      Logs.getAllLogs(function(err,logs){
        if (!err) {
          $scope.logs = logs;
          $scope.groupsRankingDatatable();
        } else {
          //error
          $scope.logAlerts.push({type: "danger", msg:"Error loading all logs" });
        }
      });
    };
    /**
     * Updates the data when the starting or ending dates are changed
     */
    var update = function () {
      getSigninDataForGraph();
      getReportedBugsDataForGraph();
      getGoldMedalsDataForGraph();
      getSilverMedalsDataForGraph();
      getAcceptReportDataForGraph();
      getRejectDataForGraph();
      getAllLogsData();
    };

    /**
     * updates all the logs, including sign in per day, reported bugs, etc.
     */
    $scope.findAllLogs = function() {
      update();
    };



		$scope.groupsRankingDatatable = function() {
			var data = $scope.logs;
			for (var i = data.length - 1; i >= 0; i--) {
				pushCodeText(data[i]);
			};
			$scope.datatableLogs = new NgTableParams({page: 1,count: 10}, { data: data,filterDelay: 300});
		};

		var pushCodeText = function(element) {
			//console.log('Element: ',element);
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

//Logs service used to communicate Logs REST endpoints
angular.module('competitions').factory('Logs', ['$resource','$http',
	function($resource,$http) {
		return {
			getAllLogs: function(cb) {
				$http.get('/api/logs').success(function(logs){
					cb(null,logs);
				}).error(function(err){
					cb(err,null);
				});
			},
			signinEvent: function(cb) {
				$http.get('/api/logs/signinEvent').success(function(logs){
					cb(null,logs)
				}).error(function(err){
					cb(err,null)
				});
			},
			reportBugEvent: function(cb) {
				$http.get('/api/logs/reportBugEvent').success(function(logs){
					cb(null,logs);
				}).error(function(err){
					cb(err,null);
				});
			},
			reportGoldMedalBugEvent: function(cb) {
				$http.get('/api/logs/reportGoldMedalBugEvent').success(function(logs){
					cb(null,logs);
				}).error(function(err){
					cb(err,null);
				});
			},
			reportSilverMedalBugEvent: function(cb) {
				$http.get('/api/logs/reportSilverMedalBugEvent').success(function(logs){
					cb(null,logs);
				}).error(function(err){
					cb(err,null);
				});
			},
			reportAcceptedBugEvent: function(cb) {
				$http.get('/api/logs/reportAcceptedBugEvent').success(function(logs){
					cb(null,logs);
				}).error(function(err){
					cb(err,null);
				});
			},
			reportRejectedBugEvent: function(cb) {
				$http.get('/api/logs/reportRejectedBugEvent').success(function(logs){
					cb(null,logs);
				}).error(function(err){
					cb(err,null);
				});
			}
		}
	}
]);
/**
 * Created by Martin on 27/11/15.
 */
/**
 * StatsSrv is a service that provides functionality
 * that's used to render the graphs on the projects' stats page
 *
 * Created by Martin on 13/10/15.
 *
 */
'use strict';

angular.module('competitions')
  .service('StatsSrv', function StatsSrv() {


    /**
     * Returns a new date that is aNumOfDaysAfter days after the given date aDate.
     * @param aDate {Date} the date from which to add days
     * @param aNumOfDaysAfter {Number} number of days the new date should be after aDate
     * @returns {Date} the new date that is aNumOfDaysAfter days after aDate
     */
    var getDateNDaysAfter = function (aDate, aNumOfDaysAfter) {
      // create a new date based on aDate
      var result = new Date(aDate.getTime());
      // add the given number of days to 'result' date
      result.setDate(result.getDate() + aNumOfDaysAfter);

      return result;
    }


    /**
     * Returns a new date that is aNumOfDaysBefore days before the given date aDate.
     * @param aDate {Date} the date from which to subtract days
     * @param aNumOfDaysBefore {Number} number of days the new date should be after aDate
     * @returns {Date} the new date that is aNumOfDaysBefore days after aDate
     */
    var getDateNDaysBefore = function (aDate, aNumOfDaysBefore) {
      return getDateNDaysAfter(aDate, -(aNumOfDaysBefore));
    };


    /**
     * Adds into aArray new dates between aStartDate and aStopDate (including both boundary dates).
     * The inserted object is an object {_id: {year:, month:, day:}, count: 0}.
     * @param aStartDate {Date} first date that should be in the array
     * @param aStopDate {Date} last date that should be in the array
     * @param aArray {Array} the array to fill with elements (where they are missing)
     */
    var addMissingDates = function (aStartDate, aStopDate, aArray) {

      var currentDate = aStartDate;

      while (currentDate <= aStopDate) {
        var d = {
          _id: {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            day: currentDate.getDate()
          },
          count: 0
        };

        aArray.push(d);
        currentDate = getDateNDaysAfter(currentDate, 1);
      }
    }


    /**
     * Sorts the given Array and adds elements of form {_id: {year:, month:, day:}, count: 0} with the appropriate
     * date if that date is missing in the array.
     *
     * Requires: if aArray has elements, the satisfy object structure {_id: {year:, month:, day:}}
     *
     * @param aStartDateLogs {Date} the first date should be in the array (when this function is done)
     * @param aEndDateLogs {Date} the last date should be in the array (when this function is done)
     * @param aArray {Array} array that may contain elements that satisfy object structure {_id: {year:, month:, day:}}
     */
    var sortAndAddMissingDates = function (aStartDateLogs, aEndDateLogs, aArray) {

      // Inner function implementing a comparison for two Array elements; used to sort the Array.
      var compareArrayElemsByDate = function (a, b) {
        // create dates and then subtract them to get a value that is either negative, positive, or zero
        return new Date(a._id.year, a._id.month - 1, a._id.day) - new Date(b._id.year, b._id.month - 1, b._id.day);
      }

      // sort the dates in the array
      aArray.sort(compareArrayElemsByDate);

      var aArrayLength = aArray.length;
      var milliSecsInADay = 86400000;

      // if empty, then add all dates between start and end
      if (aArrayLength == 0) {
        addMissingDates(aStartDateLogs, aEndDateLogs, aArray);
      }
      else {

        // add the missing dates between StartDate and the first element
        var firstDateInArray = new Date(aArray[0]._id.year, aArray[0]._id.month - 1, aArray[0]._id.day);

        if (firstDateInArray - aStartDateLogs >= milliSecsInADay) {

          // get the day before the first date in the array
          var dayBeforeFirstDateInArray = getDateNDaysBefore(firstDateInArray, 1);

          addMissingDates(aStartDateLogs, dayBeforeFirstDateInArray, aArray);
        }

        // add the missing dates between last element and the endDate
        var lastDateInArray = new Date(aArray[aArrayLength - 1]._id.year, aArray[aArrayLength - 1]._id.month - 1, aArray[aArrayLength - 1]._id.day);
        if (aEndDateLogs - lastDateInArray >= milliSecsInADay) {

          // get the day after the last date in the array
          var dayAfterLastDateInArray = getDateNDaysAfter(lastDateInArray, 1);

          addMissingDates(dayAfterLastDateInArray, aEndDateLogs, aArray);
        }
      }

      for (var i = 0; i < aArrayLength - 1; i++) {

        var dateInArray = new Date(aArray[i]._id.year, aArray[i]._id.month - 1, aArray[i]._id.day);
        var nextDateInArray = new Date(aArray[i + 1]._id.year, aArray[i + 1]._id.month - 1, aArray[i + 1]._id.day);

        if (nextDateInArray - dateInArray >= milliSecsInADay) {

          // get the day after and the day before the dates in the array
          var dayAfterDateInArray = getDateNDaysAfter(dateInArray, 1);
          var dayBeforeNextDateInArray = getDateNDaysBefore(nextDateInArray, 1)

          addMissingDates(dayAfterDateInArray, dayBeforeNextDateInArray, aArray);
        }
      }

      // sort again after we've added all the missing dates to the array
      aArray.sort(compareArrayElemsByDate);
    };


    // the return object, exposing the public functions of this service
    return {
      sortAndAddMissingDates: sortAndAddMissingDates
    };

  });

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication','Permission',
	function($scope, $http, $location, Authentication,Permission) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		function hasRol(rol,roles) {
			var result = false;
			if (roles){
				for (var i = roles.length - 1; i >= 0; i--) {
					if (roles[i]===rol){
						result = true;
						break;
					}
				};
			}
			return result;
		}

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				var roles = Authentication.user.roles;
				//window.location.reload();
				Permission
				//for admin
			    .defineRole('user', function (stateParams) {
					return hasRol("user",roles);
				})
			    //for admin
			    .defineRole('admin', function (stateParams) {
					return hasRol("admin",roles);
				});
				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				var roles = Authentication.user.roles;
				//window.location.reload();
				Permission
				//for admin
			    .defineRole('user', function (stateParams) {
					return hasRol("user",roles);
				})
			    //for admin
			    .defineRole('admin', function (stateParams) {
					return hasRol("admin",roles);
				});

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);