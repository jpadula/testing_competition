'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var competitions = require('../../app/controllers/competitions.server.controller');

	// Competitions Routes
	app.route('/competitions')
		.get(competitions.list)
		.post(users.hasAuthorization(["admin"]), competitions.create);

	app.route('/competitions/:competitionId')
		.get(competitions.read)
		.put(users.hasAuthorization(["admin"]), competitions.hasAuthorization, competitions.update)
		.delete(users.hasAuthorization(["admin"]), competitions.hasAuthorization, competitions.delete);

	// Finish by binding the Competition middleware
	app.param('competitionId', competitions.competitionByIdOrName);
};