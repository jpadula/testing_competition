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