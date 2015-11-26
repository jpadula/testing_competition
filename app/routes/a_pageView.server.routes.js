'use strict';

module.exports = function(app) {
	var logs = require('../../app/controllers/a_pageView.server.controller');
	var users = require('../../app/controllers/users.server.controller');

	// Logs Routes
	app.route('/api/logs')
		.get(users.hasAuthorization(["admin"]),logs.list);
};
