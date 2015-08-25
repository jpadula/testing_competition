'use strict';

// Competitions controller
angular.module('competitions').controller('CompetitionsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Competitions',
	function($scope, $stateParams, $location, Authentication, Competitions) {
		$scope.authentication = Authentication;

		// Create new Competition
		$scope.create = function() {
			// Create new Competition object
			var competition = new Competitions ({
				name: this.name
			});

			// Redirect after save
			competition.$save(function(response) {
				$location.path('competitions/' + response._id);

				// Clear form fields
				$scope.name = '';
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
			$scope.competition = Competitions.get({ 
				competitionId: $stateParams.competitionId
			});
		};
	}
]);