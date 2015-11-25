'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Competition = mongoose.model('Competition'),
	_ = require('lodash');

/**
 * Create a Competition
 */
exports.create = function(req, res) {
	//extract the req data
	var groupsList = req.body.groupsList;
	var name = req.body.name;
	var POINTS = req.body.POINTS;
	var description = req.body.description;
	//create the competition to save and set the variables
	var competition = new Competition();
	competition.user = req.user;
	competition.name = name;
	competition.POINTS = POINTS;
	competition.description = description;
	//we should cast to ObjectId of Mongoose each ID in groupsList variable
	competition.groupsList=[];
	for (var i = groupsList.length - 1; i >= 0; i--) {
		competition.groupsList.push(mongoose.Types.ObjectId(groupsList[i]._id));
	};
	
	competition.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(competition);
		}
	});
};

/**
 * Show the current Competition
 */
exports.read = function(req, res) {
	res.jsonp(req.competition);
};

/**
 * Update a Competition
 */
exports.update = function(req, res) {
	var competition = req.competition ;

	competition = _.extend(competition , req.body);

	competition.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(competition);
		}
	});
};

/**
 * Delete an Competition
 */
exports.delete = function(req, res) {
	var competition = req.competition ;

	competition.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(competition);
		}
	});
};

/**
 * List of Competitions
 */
exports.list = function(req, res) { 
	Competition.find().sort('-created').populate('user', 'displayName').exec(function(err, competitions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(competitions);
		}
	});
};

/**
 * Competition middleware
 */
var competitionByID = function(req, res, next, id) { 
	Competition.findById(id).populate('user', 'displayName').populate('groupsList').exec(function(err, competition) {
		if (err) return next(err);
		if (! competition) return next(new Error('Failed to load Competition ' + id));
		req.competition = competition ;
		next();
	});
};

/**
 * Competition middleware
 */
var competitionByName = function(req, res, next, name) { 
	Competition.findOne({"name":name}).populate('user', 'displayName').populate('groupsList', 'name number').exec(function(err, competition) {
		if (err) return next(err);
		if (! competition) return next(new Error('Failed to load Competition ' + name));
		req.competition = competition ;
		next();
	});
};

/**
 * Competition middleware
 */
exports.competitionByIdOrName = function(req, res, next, idOrName) { 
	if (idOrName.match(/^[0-9a-fA-F]{24}$/)) {
		// Yes, it's a valid ObjectId, proceed with `findById` call.
		competitionByID(req,res,next,idOrName);
	} else {
		competitionByName(req,res,next,idOrName);
	}
};

/**
 * Competition authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.competition.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
