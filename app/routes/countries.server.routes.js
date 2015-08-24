'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var countries = require('../../app/controllers/countries.server.controller');

	// Countries Routes
	app.route('/countries')
		.get(countries.list)
		.post(users.hasAuthorization("admin"), countries.create);

	app.route('/countries/:countryId')
		.get(users.hasAuthorization("admin"),countries.read)
		.put(users.hasAuthorization("admin"), countries.hasAuthorization, countries.update)
		.delete(users.hasAuthorization("admin"), countries.hasAuthorization, countries.delete);

	// Finish by binding the Country middleware
	app.param('countryId', countries.countryByID);
};