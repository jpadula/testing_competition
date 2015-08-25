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