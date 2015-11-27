/**
 * Created by Martin on 23/11/2015.
 */
'use strict';

// Application Config
var mongoose = require('mongoose'),
    pageViewModel = mongoose.model('pageView'), //TODO: FIX
    requestIp = require('request-ip'); //TODO: FIX

var events = {};

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



/**
 * Creates a log for accessing to a page. This function expects an object
 * with fields ip, pageCode, page, userName, date, and groupName (optional).
 * @param log: an event object
 */
var addPageLog = function (log) {
  var log = new pageViewModel(log);

  log.save(function (err) {
    if (err) {
      console.log("Error storing the logs");
    }
  });
}

/**
 * Returns an object representing the action successful signin
 * @param req: request object
 * @param aUserName: {String} name of user
 * @returns { logObject}
 */
events.signinEvent = function (aReq, aUserName) {
  return {
    ip: requestIp.getClientIp(aReq),
    pageCode: 1,// 'sign in',
    userName: aUserName
  };
};

/**
 * Returns an object representing the action failed signin
 * @param req: request object
 * @param aUserName: {String} name of user
 * @returns { logObject}
 */
events.failedSigninEvent = function (aReq, aUserName) {
  return {
    ip: requestIp.getClientIp(aReq),
    pageCode: 2,// 'failed sign in',
    userName: aUserName
  };
};

/**
 * Returns an object representing the action signout
 * @param req: request object
 * @param aUserName: {String} name of user
 * @returns { logObject}
 */
events.signoutEvent = function (aReq, aUserName) {
  return {
    ip: requestIp.getClientIp(aReq),
    pageCode: 3,// 'sign out',
    userName: aUserName
  };
};

/**
 * Returns an object representing the action report a bug (any including gold medals and silver medals)
 * @param req: request object
 * @param aUserName: {String} name of user
 * @param aCompetitionName: {String} name of the competition
 * @param aGroupName: {String} name of the group
 * @returns { logObject}
 */
events.reportBugEvent = function (aReq, aUserName, aCompetitionName, aGroupName) {
  return {
    ip: requestIp.getClientIp(aReq),
    pageCode: 4,// 'report a bug',
    userName: aUserName,
    competitionName: aCompetitionName,
    groupName: aGroupName
  };
};


/**
 * Returns an object representing the action report a gold medal bug
 * @param req: request object
 * @param aUserName: {String} name of user
 * @param aCompetitionName: {String} name of the competition
 * @param aGroupName: {String} name of the group
 * @returns { logObject}
 */
events.reportGoldMedalBugEvent = function (aUserName, aCompetitionName, aGroupName) {
  return {
    ip: "NA", //TODO: this is a quick fix due to issues in the pre-save. Now, we decided to remo the IP to simplify
    pageCode: 5,// 'report a gold medal bug',
    userName: aUserName,
  competitionName: aCompetitionName,
  groupName: aGroupName
  };
};


/**
 * Returns an object representing the action report a silver medal bug
 * @param req: request object
 * @param aUserName: {String} name of user
 * @param aCompetitionName: {String} name of the competition
 * @param aGroupName: {String} name of the group
 * @returns { logObject}
 */
events.reportSilverMedalBugEvent = function (aUserName, aCompetitionName, aGroupName) {
  return {
    ip: "NA", //TODO: this is a quick fix due to issues in the pre-save. Now, we decided to remo the IP to simplify
    pageCode: 6,// 'report a silver medal bug',
    userName: aUserName,
  competitionName: aCompetitionName,
  groupName: aGroupName
  };
};

/**
 * Returns an object representing the action accept bug
 * @param req: request object
 * @param aUserName: {String} name of user
 * @param aCompetitionName: {String} name of the competition
 * @param aGroupName: {String} name of the group
 * @returns { logObject}
 */
events.reportAcceptBugEvent = function (aUserName, aCompetitionName, aGroupName) {
  return {
    ip: "NA", //TODO: this is a quick fix due to issues in the pre-save. Now, we decided to remo the IP to simplify
    pageCode: 7,// 'accept a bug',
    userName: aUserName,
  competitionName: aCompetitionName,
  groupName: aGroupName
  };
};

/**
 * Returns an object representing the action reject bug
 * @param req: request object
 * @param aUserName: {String} name of user
 * @param aCompetitionName: {String} name of the competition
 * @param aGroupName: {String} name of the group
 * @returns { logObject}
 */
events.reportRejectBugEvent = function (aUserName, aCompetitionName, aGroupName) {
  return {
    ip: "NA", //TODO: this is a quick fix due to issues in the pre-save. Now, we decided to remo the IP to simplify
    pageCode: 8,// 'reject a bug',
    userName: aUserName,
  competitionName: aCompetitionName,
  groupName: aGroupName
  };
};

/**
 * Returns an object representing the access of ranking per user
 * @param req: request object
 * @param aUserName: {String} name of user
 * @param aCompetitionName: {String} name of the competition
 * @returns { logObject}
 */
events.accessRankingPerUserEvent = function (aReq, aUserName, aCompetitionName) { 
  return {
    ip: requestIp.getClientIp(aReq),
    pageCode: 9,// 'access ranking per user',
    userName: aUserName,
    competitionName: aCompetitionName
  };
};

/**
 * Returns an object representing the access of ranking per group
 * @param req: request object
 * @param aUserName: {String} name of user
 * @param aCompetitionName: {String} name of the competition
 * @returns { logObject}
 */
events.accessRankingPerGroupEvent = function (aReq, aUserName, aCompetitionName) {
  return {
    ip: requestIp.getClientIp(aReq),
    pageCode: 10,// 'access ranking per group',
    userName: aUserName,
    competitionName: aCompetitionName
  };
};

/**
 * Returns an object representing the access of more bugs in groups
 * @param req: request object
 * @param aUserName: {String} name of user
 * @param aCompetitionName: {String} name of the competition
 * @returns { logObject}
 */
events.accessMoreBugsInGroupsEvent = function (aReq, aUserName, aCompetitionName) {
  return {
    ip: requestIp.getClientIp(aReq),
    pageCode: 11,// 'access more bugs found in a group',
    userName: aUserName,
    competitionName: aCompetitionName
  };
};

// export the service functions
exports.addPageLog = addPageLog;
exports.events = events;
exports.apiEvents = apiEvents;