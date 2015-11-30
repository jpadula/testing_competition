'use strict';

// Application Config
var mongoose = require('mongoose'),
    pageViewModel = mongoose.model('pageView'), //TODO: FIX
    Bug = mongoose.model('Bug'), //TODO: FIX
    requestIp = require('request-ip'); //TODO: FIX

var apiEvents = {};

/**private generic function
* @param {String} aPageCode: the mumber of the page code 
* @param {function ({String} error, {Array} result)} callback: 
      error: if there is an error in the DB, error is not null 
      result: contails the result of the query: an array where each element is
      {
        _id: {year, month, day}, 
        count
      }
*/
var reportAggregate = function(aPageCode,callback) {
  var fDate = {
      year:{$year:"$date"},
      month: {$month:"$date"},
      day:{$dayOfMonth:"$date"}
    };
  var filter = {
    $match:{"pageCode":aPageCode}
  };
  pageViewModel.aggregate(filter,{$group: {
      _id: fDate,
      count: { $sum: 1 }
    }
  },function(err,result){
      if (!err) {
        callback(null,result);
      } else {
        callback(err,null);
      }
  });
};

apiEvents.listBugsPerUserLogsPerDay = function(callback) {
    Bug.aggregate([
        { $group: {
            _id:"$user",
            count: { $sum: 1 },
            username : {$last:"$userName"}
        }},
        {$sort:{
          "count": 1
        }}
    ],function(err,result) {
      if (err) {
        callback(err,null);
      } else {
        callback(null,result);
      }
    });
};

/**
* Returns list of Signin events grouped per day
* @param {function} callback
*/
apiEvents.listSigninLogsPerDay = function(callback) {
  reportAggregate('1',callback);
};

/**
* Returns list of Bugs events grouped per day
* @param {function} callback
*/
apiEvents.listReportBugLogsPerDay = function(callback) {
  reportAggregate('4',callback);
};

/**
* Returns list of Gold medals Bugs events grouped per day
* @param {function} callback
*/
apiEvents.listReportGoldMedalBugLogsPerDay = function(callback) {
  reportAggregate('5',callback);
};

/**
* Returns list of  Silver Medals Bugs events grouped per day
* @param {function} callback
*/
apiEvents.listReportSilverMedalBugLogsPerDay = function(callback) {
  reportAggregate('6',callback);
};

/**
* Returns list of  Accepted Bugs events grouped per day
* @param {function} callback
*/
apiEvents.listReportAcceptedBugLogsPerDay = function(callback) {
  reportAggregate('7',callback);
};

/**
* Returns list of  Rejected Bugs events grouped per day
* @param {function} callback
*/
apiEvents.listReportRejectedBugLogsPerDay = function(callback) {
  reportAggregate('8',callback);
};

exports.apiEvents = apiEvents;