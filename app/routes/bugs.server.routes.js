'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var bugs = require('../../app/controllers/bugs.server.controller');

	// Finish by binding the Bug middleware
	app.param('bugId', bugs.bugByID);

	// Bugs Routes
	app.route('/bugs')
		.get(bugs.list)
		.post(bugs.create);

	app.route('/bugs/:bugId')
		.get(bugs.read)
		.put(users.hasAuthorization(["admin"]), bugs.hasAuthorization, bugs.update)
		.delete(users.hasAuthorization(["admin"]), bugs.hasAuthorization, bugs.delete);
};
