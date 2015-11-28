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
	
	// Number of bugs reported per day.
	app.route('/api/logs/reportBugEvent')
		.get(usersCtr.hasAuthorization(["admin"]),logsCtr.listReportBugLogs);

	// Number of gold medalbugs reported per day.
	app.route('/api/logs/reportGoldMedalBugEvent')
		.get(usersCtr.hasAuthorization(["admin"]),logsCtr.listReportGoldMedalBugLogs);

	// Number of silver medal bugs reported per day.
	app.route('/api/logs/reportSilverMedalBugEvent')
		.get(usersCtr.hasAuthorization(["admin"]),logsCtr.listReportSilverMedalBugLogs);

	// Number of bugs accepted per day.
	app.route('/api/logs/reportAcceptedBugEvent')
		.get(usersCtr.hasAuthorization(["admin"]),logsCtr.listReportAcceptedBugLogs);

	// Number of bugs rejected per day.
	app.route('/api/logs/reportRejectedBugEvent')
		.get(usersCtr.hasAuthorization(["admin"]),logsCtr.listReportRejectedBugLogs);
	
	// Number of bugs per user per day.
	app.route('/api/logs/listBugsPerUserEvent')
		.get(usersCtr.hasAuthorization(["admin"]),logsCtr.listBugsPerUser);


};
