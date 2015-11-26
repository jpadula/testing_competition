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
			}
		}
	}
]);