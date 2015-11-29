/**
 * Created by Martin on 29/11/15.
 */
  // to run all tests, run:  npm run-script test

var app = require('../server.js'),
  request = require('supertest'),
  express = require('express'),
  should = require('should'),
  bodyParser = require('body-parser'),
  testConfig = require('./../app/tests/testConfig.js');

app.use(bodyParser());

describe('Test Mantra with Java compilation', function () {

  this.timeout(testConfig.timeOut);

  it('First test: do not delete', function (done) {

    request(app)
      .get('/bugs')
      .send()
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (error, reply) {
        console.log(reply.body);
        //(reply.body.output.indexOf("Compilation successful")).should.not.equal(-1);

        //reply.body.compilationError.should.equal(false);
        //reply.body.id.should.not.equal(undefined);
        done();
      })
  });

  it('Admin signs in', function (done) {
    done();
  });

  it('Admin gets list of competitions', function (done) {
    // GET /competitions
    done();
  });

  it('Admin gets list of groups', function (done) {
    // GET /groups
    done();
  });

  it('Admin creates a group', function (done) {
    // POST /groups
    done();
  });

  it('Admin updates a group', function (done) {
    // PUT /groups
    done();
  });

  it('Admin deletes a group', function (done) {
    // DELETE /groups
    done();
  });

  it('Admin creates a competition', function (done) {
    // POST /competitions
    done();
  });

  it('Admin updates a competition', function (done) {
    // PUT /competitions
    done();
  });

  it('Admin deletes a competition', function (done) {
    // DELETE /competitions
    done();
  });

  it('Non admin cannot create groups', function (done) {
    // POST /groups
    done();
  });

});
