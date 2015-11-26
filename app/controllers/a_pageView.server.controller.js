'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Logs = mongoose.model("pageView");

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