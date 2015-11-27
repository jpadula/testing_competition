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