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
	var competition = new Competition(req.body);
	competition.user = req.user;

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
exports.competitionByID = function(req, res, next, id) { 
	Competition.findById(id).populate('user', 'displayName').exec(function(err, competition) {
		if (err) return next(err);
		if (! competition) return next(new Error('Failed to load Competition ' + id));
		req.competition = competition ;
		next();
	});
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
