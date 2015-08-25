'use strict';

(function() {
	// Competitions Controller Spec
	describe('Competitions Controller Tests', function() {
		// Initialize global variables
		var CompetitionsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Competitions controller.
			CompetitionsController = $controller('CompetitionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Competition object fetched from XHR', inject(function(Competitions) {
			// Create sample Competition using the Competitions service
			var sampleCompetition = new Competitions({
				name: 'New Competition'
			});

			// Create a sample Competitions array that includes the new Competition
			var sampleCompetitions = [sampleCompetition];

			// Set GET response
			$httpBackend.expectGET('competitions').respond(sampleCompetitions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.competitions).toEqualData(sampleCompetitions);
		}));

		it('$scope.findOne() should create an array with one Competition object fetched from XHR using a competitionId URL parameter', inject(function(Competitions) {
			// Define a sample Competition object
			var sampleCompetition = new Competitions({
				name: 'New Competition'
			});

			// Set the URL parameter
			$stateParams.competitionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/competitions\/([0-9a-fA-F]{24})$/).respond(sampleCompetition);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.competition).toEqualData(sampleCompetition);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Competitions) {
			// Create a sample Competition object
			var sampleCompetitionPostData = new Competitions({
				name: 'New Competition'
			});

			// Create a sample Competition response
			var sampleCompetitionResponse = new Competitions({
				_id: '525cf20451979dea2c000001',
				name: 'New Competition'
			});

			// Fixture mock form input values
			scope.name = 'New Competition';

			// Set POST response
			$httpBackend.expectPOST('competitions', sampleCompetitionPostData).respond(sampleCompetitionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Competition was created
			expect($location.path()).toBe('/competitions/' + sampleCompetitionResponse._id);
		}));

		it('$scope.update() should update a valid Competition', inject(function(Competitions) {
			// Define a sample Competition put data
			var sampleCompetitionPutData = new Competitions({
				_id: '525cf20451979dea2c000001',
				name: 'New Competition'
			});

			// Mock Competition in scope
			scope.competition = sampleCompetitionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/competitions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/competitions/' + sampleCompetitionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid competitionId and remove the Competition from the scope', inject(function(Competitions) {
			// Create new Competition object
			var sampleCompetition = new Competitions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Competitions array and include the Competition
			scope.competitions = [sampleCompetition];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/competitions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCompetition);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.competitions.length).toBe(0);
		}));
	});
}());