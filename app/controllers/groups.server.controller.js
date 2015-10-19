'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Group = mongoose.model('Group'),
	User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create a Group
 */
exports.create = function(req, res) {
	//extract the req data
	var number = req.body.number;
	var name = req.body.name;
	var githubAccounts = req.body.githubAccounts;
	//create the group to save and set the variables
	var group = new Group();
	group.user = req.user;
	group.name = name;
	group.number = number;
	group.githubAccounts = githubAccounts;
	var gaccounts = githubAccounts.split(',');
	for (var i = gaccounts.length - 1; i >= 0; i--) {
		group.studentsArrayList.push(gaccounts[i]);
	};
	
	/*
	//we should cast to ObjectId of Mongoose each ID in studentsList variable
	var studentsList = req.body.studentsList;
	group.studentsList=[];
	for (var i = studentsList.length - 1; i >= 0; i--) {
		group.studentsList.push(mongoose.Types.ObjectId(studentsList[i]._id));
	};
	*/
	
	group.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var arrayGithubAccounts = githubAccounts.split(',');
			for (var i = arrayGithubAccounts.length - 1; i >= 0; i--) {
				var u = new User();
				u.displayName = arrayGithubAccounts[i];
				u.firstName = arrayGithubAccounts[i];
				u.lastName = arrayGithubAccounts[i];
				u.password = arrayGithubAccounts[i];
				u.username = arrayGithubAccounts[i];
				u.provider = 'github';
				u.save(function(err){
					if (err) {
						console.log(err);
					}
				});
				
			};
			res.jsonp(group);
		}
	});
};

/**
 * Show the current Group
 */
exports.read = function(req, res) {
	res.jsonp(req.group);
};

/**
 * Update a Group
 */
exports.update = function(req, res) {
	var group = req.group ;

	group = _.extend(group , req.body);

	group.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(group);
		}
	});
};

/**
 * Delete an Group
 */
exports.delete = function(req, res) {
	var group = req.group ;

	group.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(group);
		}
	});
};

/**
 * List of Groups
 */
exports.list = function(req, res) { 
	Group.find().sort('-created').populate('user', 'displayName').exec(function(err, groups) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(groups);
		}
	});
};

/**
 * Group middleware
 */
exports.groupByID = function(req, res, next, id) { 
	Group.findById(id).populate('user', 'displayName').populate('studentsList', 'displayName email').exec(function(err, group) {
		if (err) return next(err);
		if (! group) return next(new Error('Failed to load Group ' + id));
		req.group = group ;
		next();
	});
};

/**
 * Group authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.group.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
