/**
 * Created by Martin on 23/11/2015.
 */
'use strict';

// Application Config
var mongoose = require('mongoose'),
    pageViewModel = mongoose.model('pageView'), //TODO: FIX
    requestIp = require('request-ip'); //TODO: FIX

var events = {};

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
    userName: aUserName,
    date: new Date()
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
    userName: aUserName,
    date: new Date()
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
    userName: aUserName,
    date: new Date()
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
    date: new Date(),
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
events.reportGoldMedalBugEvent = function (aReq, aUserName, aCompetitionName, aGroupName) {
  return {
    ip: requestIp.getClientIp(aReq),
    pageCode: 5,// 'report a gold medal bug',
    userName: aUserName,
  competitionName: aCompetitionName,
    date: new Date(),
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
events.reportSilverMedalBugEvent = function (aReq, aUserName, aCompetitionName, aGroupName) {
  return {
    ip: requestIp.getClientIp(aReq),
    pageCode: 6,// 'report a silver medal bug',
    userName: aUserName,
  competitionName: aCompetitionName,
    date: new Date(),
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
events.reportAcceptBugEvent = function (aReq, aUserName, aCompetitionName, aGroupName) {
  return {
    ip: requestIp.getClientIp(aReq),
    pageCode: 7,// 'accept a bug',
    userName: aUserName,
  competitionName: aCompetitionName,
    date: new Date(),
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
events.reportRejectBugEvent = function (aReq, aUserName, aCompetitionName, aGroupName) {
  return {
    ip: requestIp.getClientIp(aReq),
    pageCode: 8,// 'reject a bug',
    userName: aUserName,
  competitionName: aCompetitionName,
    date: new Date(),
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
  competitionName: aCompetitionName,
    date: new Date(),
  groupName: aGroupName
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
  competitionName: aCompetitionName,
    date: new Date(),
  groupName: aGroupName
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
  competitionName: aCompetitionName,
    date: new Date(),
  groupName: aGroupName
  };
};

// export the service functions
exports.addPageLog = addPageLog;
exports.events = events;