'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Logs = mongoose.model("pageView"),
	logApiEvents = require('../services/logApiEvents.js');

/**
 * List of Logs
 */
exports.list = function(req, res) { 
	Logs.find().sort('-created').exec(function(err, logs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(logs);
		}
	});
};

/**
 * List of Logs of bugs per User
 * @param req: Request Object
 * @param res: Response Object
 */
exports.listBugsPerUser = function(req, res) {
	logApiEvents.apiEvents.listBugsPerUserLogsPerDay(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: "+err});
		}
		else {
			res.send(result);
		}
	});
};

/**
 * List of Logs of listSigninLogs
 * @param req: Request Object
 * @param res: Response Object
 */
exports.listSigninLogs = function(req, res) {
	logApiEvents.apiEvents.listSigninLogsPerDay(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: "+err});
		}
		else {
			res.send(result);
		}
	});
};

/**
 * List of Logs of Reported bugs
 * @param req: Request Object
 * @param res: Response Object
 */
exports.listReportBugLogs = function(req, res) {
	logApiEvents.apiEvents.listReportBugLogsPerDay(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: "+err});
		}
		else {
			res.send(result);
		}
	});
};

/**
 * List of Logs of reported Gold Medal bugs
 * @param req: Request Object
 * @param res: Response Object
 */
exports.listReportGoldMedalBugLogs = function(req, res) {
	logApiEvents.apiEvents.listReportGoldMedalBugLogsPerDay(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: "+err});
		}
		else {
			res.send(result);
		}
	});
};

/**
 * List of Logs of reported Silver medal bugs
 * @param req: Request Object
 * @param res: Response Object
 */
exports.listReportSilverMedalBugLogs = function(req, res) {
	logApiEvents.apiEvents.listReportSilverMedalBugLogsPerDay(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: "+err});
		}
		else {
			res.send(result);
		}
	});
};

/**
 * List of Logs of accepted bugs
 * @param req: Request Object
 * @param res: Response Object
 */
exports.listReportAcceptedBugLogs = function(req, res) {
	logApiEvents.apiEvents.listReportAcceptedBugLogsPerDay(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: "+err});
		}
		else {
			res.send(result);
		}
	});
};

/**
 * List of Logs of rejected bugs
 * @param req: Request Object
 * @param res: Response Object
 */
exports.listReportRejectedBugLogs = function(req, res) {
	logApiEvents.apiEvents.listReportRejectedBugLogsPerDay(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: "+err});
		}
		else {
			res.send(result);
		}
	});
};

/**
 * List of Logs of access to Rankings
 * @param req: Request Object
 * @param res: Response Object
 */
exports.accessToRankings = function(req, res) {
	logApiEvents.apiEvents.listAccessToRankingsPerDay(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: "+err});
		}
		else {
			res.send(result);
		}
	});
};

/**
 * List of Logs of open,rejected,accepted
 * @param req: Request Object
 * @param res: Response Object
 */
exports.listReportStatusBugs = function(req, res) {
	logApiEvents.apiEvents.getCountStatusBug(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: "+err});
		}
		else {
			res.send(result);
		}
	});
};

