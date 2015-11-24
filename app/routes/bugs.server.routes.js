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
	
	app.route('/bugs/getOpenBugs')
		.post(bugs.getOpenBugs);

	app.route('/bugs/getMyOpenBugs')
		.post(bugs.getMyOpenBugs);

	app.route('/bugs/getByGroupId')
		.post(bugs.getByGroupId);
	
	app.route('/bugs/getAllByCompetition')
		.post(bugs.getAllByCompetition);

	app.route('/bugs/getUsersRanking')
		.post(bugs.getUsersRanking);
		
	app.route('/bugs/getGroupsRanking')
		.post(bugs.getGroupsRanking);
	
	app.route('/bugs/getGroupsWithMoreBugsRanking')
		.post(bugs.getGroupsWithMoreBugsRanking);



	app.route('/bugs/:bugId')
		.get(bugs.read)
		.put(bugs.hasAuthorization, bugs.update)
		.delete(users.hasAuthorization(["admin"]), bugs.hasAuthorization, bugs.delete);
};
