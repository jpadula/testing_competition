'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Logs = mongoose.model("pageView"),
	logSrv = require('../services/logSrv.js');

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
 * List of Logs of listSigninLogs
 * @param req: Request Object
 * @param res: Response Object
 */
exports.listSigninLogs = function(req, res) {
	logSrv.apiEvents.listSigninLogsPerDay(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: ",err});
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
	logSrv.apiEvents.listReportBugLogsPerDay(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: ",err});
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
	logSrv.apiEvents.listReportGoldMedalBugLogsPerDay(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: ",err});
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
	logSrv.apiEvents.listReportSilverMedalBugLogsPerDay(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: ",err});
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
	logSrv.apiEvents.listReportAcceptedBugLogsPerDay(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: ",err});
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
	logSrv.apiEvents.listReportRejectedBugLogsPerDay(function(err,result){
		if (err) {
			res.status(400).send({message:"Error: ",err});
		}
		else {
			res.send(result);
		}
	});
};

