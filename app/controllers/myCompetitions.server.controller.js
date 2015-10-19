'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Competition = mongoose.model('Competition'),
	Group = mongoose.model('Group'),
	_ = require('lodash');

/**
 * List of Competitions
 */
exports.list = function(req, res) { 
	console.log("hola",req.user);
	var username = [req.user.username];
	Group.find({studentsArrayList:{$in:username}}).exec(function(err,groups){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var arrayGroupsID = [];
			for (var i = groups.length - 1; i >= 0; i--) {
				arrayGroupsID.push(groups[i]._id);
			};
			Competition.find({groupsList:{$in:arrayGroupsID}}).exec(function(err,competitions){
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.jsonp(competitions);
				}
			});
			
		}
	});
};

