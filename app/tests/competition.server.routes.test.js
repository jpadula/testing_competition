'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Competition = mongoose.model('Competition'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, competition;

/**
 * Competition routes tests
 */
describe('Competition CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Competition
		user.save(function() {
			competition = {
				name: 'Competition Name'
			};

			done();
		});
	});

	it('should be able to save Competition instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Competition
				agent.post('/competitions')
					.send(competition)
					.expect(200)
					.end(function(competitionSaveErr, competitionSaveRes) {
						// Handle Competition save error
						if (competitionSaveErr) done(competitionSaveErr);

						// Get a list of Competitions
						agent.get('/competitions')
							.end(function(competitionsGetErr, competitionsGetRes) {
								// Handle Competition save error
								if (competitionsGetErr) done(competitionsGetErr);

								// Get Competitions list
								var competitions = competitionsGetRes.body;

								// Set assertions
								(competitions[0].user._id).should.equal(userId);
								(competitions[0].name).should.match('Competition Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Competition instance if not logged in', function(done) {
		agent.post('/competitions')
			.send(competition)
			.expect(401)
			.end(function(competitionSaveErr, competitionSaveRes) {
				// Call the assertion callback
				done(competitionSaveErr);
			});
	});

	it('should not be able to save Competition instance if no name is provided', function(done) {
		// Invalidate name field
		competition.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Competition
				agent.post('/competitions')
					.send(competition)
					.expect(400)
					.end(function(competitionSaveErr, competitionSaveRes) {
						// Set message assertion
						(competitionSaveRes.body.message).should.match('Please fill Competition name');
						
						// Handle Competition save error
						done(competitionSaveErr);
					});
			});
	});

	it('should be able to update Competition instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Competition
				agent.post('/competitions')
					.send(competition)
					.expect(200)
					.end(function(competitionSaveErr, competitionSaveRes) {
						// Handle Competition save error
						if (competitionSaveErr) done(competitionSaveErr);

						// Update Competition name
						competition.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Competition
						agent.put('/competitions/' + competitionSaveRes.body._id)
							.send(competition)
							.expect(200)
							.end(function(competitionUpdateErr, competitionUpdateRes) {
								// Handle Competition update error
								if (competitionUpdateErr) done(competitionUpdateErr);

								// Set assertions
								(competitionUpdateRes.body._id).should.equal(competitionSaveRes.body._id);
								(competitionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Competitions if not signed in', function(done) {
		// Create new Competition model instance
		var competitionObj = new Competition(competition);

		// Save the Competition
		competitionObj.save(function() {
			// Request Competitions
			request(app).get('/competitions')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Competition if not signed in', function(done) {
		// Create new Competition model instance
		var competitionObj = new Competition(competition);

		// Save the Competition
		competitionObj.save(function() {
			request(app).get('/competitions/' + competitionObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', competition.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Competition instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Competition
				agent.post('/competitions')
					.send(competition)
					.expect(200)
					.end(function(competitionSaveErr, competitionSaveRes) {
						// Handle Competition save error
						if (competitionSaveErr) done(competitionSaveErr);

						// Delete existing Competition
						agent.delete('/competitions/' + competitionSaveRes.body._id)
							.send(competition)
							.expect(200)
							.end(function(competitionDeleteErr, competitionDeleteRes) {
								// Handle Competition error error
								if (competitionDeleteErr) done(competitionDeleteErr);

								// Set assertions
								(competitionDeleteRes.body._id).should.equal(competitionSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Competition instance if not signed in', function(done) {
		// Set Competition user 
		competition.user = user;

		// Create new Competition model instance
		var competitionObj = new Competition(competition);

		// Save the Competition
		competitionObj.save(function() {
			// Try deleting Competition
			request(app).delete('/competitions/' + competitionObj._id)
			.expect(401)
			.end(function(competitionDeleteErr, competitionDeleteRes) {
				// Set message assertion
				(competitionDeleteRes.body.message).should.match('User is not logged in');

				// Handle Competition error error
				done(competitionDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Competition.remove().exec();
		done();
	});
});