'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Bug = mongoose.model('Bug'),
	Group = mongoose.model("Group"),
	_ = require('lodash');



var getGroupByUser = function(req,cb) {
	var userID = [req.user._id];
	Group.find({studentsList: {$in: userID}}).exec(function (err,group) {
		if (!err) {
			if (!group){
				cb("The user has not in a valid group",null);
			}
			cb(null,group[0]);
		} else {
			cb(err,null);
		}
	});
}

/**
 * Create a Bug
 */
exports.create = function(req, res) {
	var bug = new Bug(req.body);
	bug.user = req.user;
	var userID = [req.user._id];
	//First, search the User Group for this competition
	getGroupByUser(req,function(err,group){
		if (!err) {
			bug.group = group;
			bug.save(function(err) {
				if (err) {
					console.log(err);
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.jsonp(bug);
				}
			});
		} else {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	});
};

/**
 * Show the current Bug
 */
exports.read = function(req, res) {
	res.jsonp(req.bug);
};

/**
 * Update a Bug
 */
exports.update = function(req, res) {
	var bug = req.bug ;

	bug = _.extend(bug , req.body);

	bug.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bug);
		}
	});
};

/**
 * Delete a Bug
 */
exports.delete = function(req, res) {
	var bug = req.bug ;

	bug.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bug);
		}
	});
};

/**
 * List of Bugs
 */
exports.list = function(req, res) { 
	Bug.find().sort('-created').populate('user', 'displayName').exec(function(err, bugs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bugs);
		}
	});
};

/**
 * List of Open Bugs
 */
exports.getOpenBugs = function(req, res) {
	var config = req.body;
	var competition = config.competition;
	console.log(competition);
	getGroupByUser(req,function(err,group){
		if (!err) {
			Bug.find({status:"OPEN",group:{$ne:group._id},competition:competition}).sort('-created').populate('user', 'displayName').exec(function(err, bugs) {
				if (err) {
					console.log(err);
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.jsonp(bugs);
				}
			});
		} else {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
	});

};

/**
 * Bug middleware
 */
exports.bugByID = function(req, res, next, id) {
	Bug.findById(id).populate('user', 'displayName').exec(function(err, bug) {
		if (err) return next(err);
		if (! bug) return next(new Error('Failed to load Bug ' + id));
		req.bug = bug ;
		next();
	});
};

/**
 * Bug authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.bug.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
