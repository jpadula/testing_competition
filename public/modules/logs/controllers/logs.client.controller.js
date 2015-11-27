'use strict';

// Logs controller
angular.module('logs').controller('LogsController', ['$scope', '$stateParams', '$location','NgTableParams','Authentication', 'Logs', 'StatsSrv',
	function($scope, $stateParams, $location,NgTableParams, Authentication, Logs, StatsSrv) {

    $scope.logAlerts = [];

    var fromDate = new Date("2015-11-25"); // TODO: refactor, to take a date from datepicker
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

      addLabelsToGraph($scope.signinLogs, $scope.singinGraph)
      console.log($scope.singinGraph);
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
    var getReportedBugsDataForGraph = function () {

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
