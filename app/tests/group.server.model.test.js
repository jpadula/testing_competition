'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Group = mongoose.model('Group');

/**
 * Globals
 */
var user, group,s1,s2;

/**
 * Unit tests
 */
describe('Group Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		s1 = new User({
			firstName: 's1',
			lastName: 's1',
			displayName: 'Full Name',
			email: 's1@s1.com',
			username: 's1',
			password: 's1'
		});

		s2 = new User({
			firstName: 's2',
			lastName: 's2',
			displayName: 'Full Name',
			email: 's@s2.com',
			username: 's2',
			password: 's2'
		});

		user.save(function() {
			s1.save(function(){
				s2.save(function(){
					group = new Group({
					name: 'Group Name',
					user: user,
					number: 1,
					studentsList: [s1,s2]
					});
					done();
				})
			})
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return group.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			group.name = '';

			return group.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Group.remove().exec();
		User.remove().exec();

		done();
	});
});