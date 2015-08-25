'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var groups = require('../../app/controllers/groups.server.controller');

	// Groups Routes
	app.route('/groups')
		.get(groups.list)
		.post(users.hasAuthorization(["admin"]), groups.create);

	app.route('/groups/:groupId')
		.get(groups.read)
		.put(users.hasAuthorization(["admin"]), groups.hasAuthorization, groups.update)
		.delete(users.hasAuthorization(["admin"]), groups.hasAuthorization, groups.delete);

	// Finish by binding the Group middleware
	app.param('groupId', groups.groupByID);
};
