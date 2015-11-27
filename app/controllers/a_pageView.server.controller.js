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
