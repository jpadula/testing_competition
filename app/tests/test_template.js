/**
 * Created by Martin on 24/11/15.
 */
var app = require('../../../server/server.js'),
  request = require('supertest'),
  express = require('express'),
  should = require('should'),
  bodyParser = require('body-parser'),
  testConfig = require('./testConfig.js');

app.use(bodyParser());

describe('Test Mantra with Java compilation', function () {

  this.timeout(testConfig.timeOut);

  it('Mantra Java: successful compilation (one file)', function (done) {

      request(app)
        .post('/')
        .send()
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (error, reply) {
          //(reply.body.output.indexOf("Compilation successful")).should.not.equal(-1);

          //reply.body.compilationError.should.equal(false);
          //reply.body.id.should.not.equal(undefined);
          done();
        })
    });

});
