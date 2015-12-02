'use strict';

// Logs controller
angular.module('logs').controller('LogsController', ['$scope', '$stateParams', '$location','NgTableParams','Authentication', 'Logs', 'StatsSrv','Users',
	function($scope, $stateParams, $location,NgTableParams, Authentication, Logs, StatsSrv,Users) {

    $scope.logAlerts = [];

    var fromDate = new Date(); // TODO: refactor, to take a date from datepicker
    fromDate.setMonth(fromDate.getMonth()-1);
    var untilDate = new Date();

    $scope.chartOptions = {
      pointHitDetectionRadius:1
    };

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
    * Adds the label usernames to the graph object
    * @param {Array} aSourceArray
    * @param {Array} aGraphObject
    * @param {Array} aExtraUsers : used to pull usernames with 0 bugs reported
    */
    var addLabelsUsername = function(aSourceArray, aGraphObject,aExtraUsers) {
      for (var i = 0; i < aSourceArray.length; i++) {
        aGraphObject.labels.push(aSourceArray[i].username);
      };
      for (var i = 0; i < aExtraUsers.length; i++) {
        var exist = false;
        for (var j = 0; j < aSourceArray.length; j++) {
          if (aExtraUsers[i].username == aSourceArray[j].username) {
            exist = true;
          }
        };
        
        if (!exist) { //we should push with 0 bugs reported
          aGraphObject.labels.unshift(aExtraUsers[i].username);
          aGraphObject.data[0].unshift(0);
        }
        
      };
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
     * Displays the graph for number of signin per day
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

    /**
     * Displays the graph for number of reported bug per day
     * Requires: $scope.compilerSummaryLogs has the data as {_id, count}
     */
    var drawReportBugGraph = function () {
      // object containing the data for rendering the graph for compilation and runs
      $scope.reportBugGraph = {
        labels: [],
        series: [],
        data: []
      };

      // sort the array for signin logs and add the missing dates (which have a count of 0)
      StatsSrv.sortAndAddMissingDates(fromDate, untilDate, $scope.reportBugLogs);

      $scope.reportBugGraph.series.push('Report Bug');
      addLineToGraph($scope.reportBugLogs, $scope.reportBugGraph);

      addLabelsToGraph($scope.reportBugLogs, $scope.reportBugGraph);
    };

    /**
     * Displays the graph for number of gold medal bugs per day
     * Requires: $scope.compilerSummaryLogs has the data as {_id, count}
     */
    var drawReportGoldMedalBugGraph = function () {
      // object containing the data for rendering the graph for compilation and runs
      $scope.reportGoldMedalBugGraph = {
        labels: [],
        series: [],
        data: []
      };

      // sort the array for signin logs and add the missing dates (which have a count of 0)
      StatsSrv.sortAndAddMissingDates(fromDate, untilDate, $scope.reportGoldMedalBugLogs);

      $scope.reportGoldMedalBugGraph.series.push('Report Gold Medal Bug');
      addLineToGraph($scope.reportGoldMedalBugLogs, $scope.reportGoldMedalBugGraph);

      addLabelsToGraph($scope.reportGoldMedalBugLogs, $scope.reportGoldMedalBugGraph);
    };

    /**
     * Displays the graph for number of silver medal bugs per day
     * Requires: $scope.compilerSummaryLogs has the data as {_id, count}
     */
    var drawReportSilverMedalBugGraph = function () {
      // object containing the data for rendering the graph for compilation and runs
      $scope.reportSilverMedalBugGraph = {
        labels: [],
        series: [],
        data: []
      };

      // sort the array for signin logs and add the missing dates (which have a count of 0)
      StatsSrv.sortAndAddMissingDates(fromDate, untilDate, $scope.reportSilverMedalBugLogs);

      $scope.reportSilverMedalBugGraph.series.push('Report Silver Medal Bug');
      addLineToGraph($scope.reportSilverMedalBugLogs, $scope.reportSilverMedalBugGraph);

      addLabelsToGraph($scope.reportSilverMedalBugLogs, $scope.reportSilverMedalBugGraph);
    };

    /**
     * Displays the graph for number of accepted bugs per day
     * Requires: $scope.compilerSummaryLogs has the data as {_id, count}
     */
    var drawReportAcceptedBugGraph = function () {
      // object containing the data for rendering the graph for compilation and runs
      $scope.reportAcceptedBugGraph = {
        labels: [],
        series: [],
        data: []
      };

      // sort the array for signin logs and add the missing dates (which have a count of 0)
      StatsSrv.sortAndAddMissingDates(fromDate, untilDate, $scope.reportAcceptedBugLogs);

      $scope.reportAcceptedBugGraph.series.push('Report Accepted Bug');
      addLineToGraph($scope.reportAcceptedBugLogs, $scope.reportAcceptedBugGraph);

      addLabelsToGraph($scope.reportAcceptedBugLogs, $scope.reportAcceptedBugGraph);
    };
   
    /**
     * Displays the graph for number of access to Rankings per day
     * Requires: $scope.compilerSummaryLogs has the data as {_id, count}
     */
    var drawAccessToRankingsGraph = function () {
      // object containing the data for rendering the graph for compilation and runs
      $scope.accessToRankingsGraph = {
        labels: [],
        series: [],
        data: []
      };

      // sort the array for signin logs and add the missing dates (which have a count of 0)
      StatsSrv.sortAndAddMissingDates(fromDate, untilDate, $scope.reportRejectedBugLogs);

      $scope.accessToRankingsGraph.series.push('Ranking hits');
      addLineToGraph($scope.reportRejectedBugLogs, $scope.accessToRankingsGraph);

      addLabelsToGraph($scope.reportRejectedBugLogs, $scope.accessToRankingsGraph);
    };


    /**
     * Displays the graph for number of Rejected bugs per day
     * Requires: $scope.compilerSummaryLogs has the data as {_id, count}
     */
    var drawReportRejectedBugGraph = function () {
      // object containing the data for rendering the graph for compilation and runs
      $scope.reportRejectedBugGraph = {
        labels: [],
        series: [],
        data: []
      };

      // sort the array for signin logs and add the missing dates (which have a count of 0)
      StatsSrv.sortAndAddMissingDates(fromDate, untilDate, $scope.reportRejectedBugLogs);

      $scope.reportRejectedBugGraph.series.push('Report Rejected Bug');
      addLineToGraph($scope.reportRejectedBugLogs, $scope.reportRejectedBugGraph);

      addLabelsToGraph($scope.reportRejectedBugLogs, $scope.reportRejectedBugGraph);
    };
    
    /**
     * Displays the graph for number of bugs per user
     * Requires: $scope.compilerSummaryLogs has the data as {_id, count}
     * @param {Array of Objects} users: necessary for the chart to complete usernames with 0 bugs reported
     */
    var drawReportBugsPerUserGraph = function (users) {
      // object containing the data for rendering the graph for compilation and runs
      $scope.reportBugsPerUserGraph = {
        labels: [],
        series: [],
        data: []
      };
      
      // sort the array for signin logs and add the missing dates (which have a count of 0)
      //StatsSrv.sortAndAddMissingDates(fromDate, untilDate, $scope.reportBugsPerUserLogs);

      $scope.reportBugsPerUserGraph.series.push('Report Bugs per User');
      addLineToGraph($scope.reportBugsPerUserLogs, $scope.reportBugsPerUserGraph);

      addLabelsUsername($scope.reportBugsPerUserLogs, $scope.reportBugsPerUserGraph,users);
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
          $scope.logAlerts.push({type: "danger", msg:"Error loading Reported bug logs" });
        }
      });
    };
    var getGoldMedalsDataForGraph = function () {
      $scope.isLoadingReportedGoldMedalBugGraphData = true;
      Logs.reportGoldMedalBugEvent(function(err,result){
        if (!err) {
          $scope.reportGoldMedalBugLogs = result;
          drawReportGoldMedalBugGraph();
          $scope.isLoadingReportedGoldMedalBugGraphData = false;

        } else {
          //error
          $scope.logAlerts.push({type: "danger", msg:"Error loading Gold Medal bugs log" });
        }
      });
    };
    var getSilverMedalsDataForGraph = function () {
      $scope.isLoadingReportedSilverMedalBugGraphData = true;
      Logs.reportSilverMedalBugEvent(function(err,result){
        if (!err) {
          $scope.reportSilverMedalBugLogs = result;
          drawReportSilverMedalBugGraph();
          $scope.isLoadingReportedSilverMedalBugGraphData = false;

        } else {
          //error
          $scope.logAlerts.push({type: "danger", msg:"Error loading Silver Medal bugs log" });
        }
      });
    };

    var getAcceptReportDataForGraph = function () {
      $scope.isLoadingReportedAcceptedBugGraphData = true;
      Logs.reportAcceptedBugEvent(function(err,result){
        if (!err) {
          $scope.reportAcceptedBugLogs = result;
          drawReportAcceptedBugGraph();
          $scope.isLoadingReportedAcceptedBugGraphData = false;

        } else {
          //error
          $scope.logAlerts.push({type: "danger", msg:"Error loading Accepted bugs log" });
        }
      });
    };
   
    var getRejectDataForGraph = function () {
      $scope.isLoadingReportedRejectedBugGraphData = true;
      Logs.reportRejectedBugEvent(function(err,result){
        if (!err) {
          $scope.reportRejectedBugLogs = result;
          drawReportRejectedBugGraph();
          $scope.isLoadingReportedRejectedBugGraphData = false;

        } else {
          //error
          $scope.logAlerts.push({type: "danger", msg:"Error loading Rejected Bugs log" });
        }
      });
    };

    var getAccessToRankingsGraph = function () {
      $scope.isLoadingAccessToRankingsGraphData = true;
      Logs.accessToRankingsEvent(function(err,result){
        if (!err) {
          $scope.reportRejectedBugLogs = result;
          drawAccessToRankingsGraph();
          $scope.isLoadingAccessToRankingsGraphData = false;

        } else {
          //error
          $scope.logAlerts.push({type: "danger", msg:"Error loading Access to Rankings log" });
        }
      });
    };

    var getBugsPerUserDataForGraph = function () {
      $scope.isLoadingBugsPerUserGraphData = true;
      Logs.listBugsPerUserEvent(function(err,result){
        if (!err) {

          Users.query(function(users){
            $scope.reportBugsPerUserLogs = result;
            drawReportBugsPerUserGraph(users);
            $scope.isLoadingBugsPerUserGraphData = false;
          });

        } else {
          //error
          $scope.logAlerts.push({type: "danger", msg:"Error loading Bugs per user logs" });
        }
      });
    };
    
    var getStatusBugsGraph = function () {
      $scope.isLoadingStatusBugGraphData = true;
      Logs.listStatusBugs(function(err,result){
        if (!err) {
          var listStatusBugs = result;

          //initialization 
          $scope.listStatusBugsGraph={};
          $scope.listStatusBugsGraph.data = [];
          $scope.listStatusBugsGraph.labels = [];

          //assign the data
          $scope.listStatusBugsGraph.data.push(listStatusBugs.open);
          $scope.listStatusBugsGraph.data.push(listStatusBugs.rejected);
          $scope.listStatusBugsGraph.data.push(listStatusBugs.approved);
          
          //assing the labels
          $scope.listStatusBugsGraph.labels.push("Open Bugs");
          $scope.listStatusBugsGraph.labels.push("Rejected Bugs");
          $scope.listStatusBugsGraph.labels.push("Approved Bugs");
          
          $scope.isLoadingStatusBugGraphData = false;

        } else {
          //error
          $scope.logAlerts.push({type: "danger", msg:"Error loading Status Bugs log" });
        }
      });
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
      getBugsPerUserDataForGraph();
      getStatusBugsGraph();
      getAccessToRankingsGraph();
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
