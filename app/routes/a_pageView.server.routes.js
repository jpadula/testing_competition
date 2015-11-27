'use strict';

module.exports = function(app) {
	var logsCtr = require('../../app/controllers/a_pageView.server.controller');
	var usersCtr = require('../../app/controllers/users.server.controller');

	// Logs Routes

	// List all the logs (which include for example: signin,signout,reportBug...etc)
	app.route('/api/logs')
		.get(usersCtr.hasAuthorization(["admin"]),logsCtr.list);
	
	// Number of users accessing per day.
	app.route('/api/logs/signinEvent')
		.get(usersCtr.hasAuthorization(["admin"]),logsCtr.listSigninLogs);

};
