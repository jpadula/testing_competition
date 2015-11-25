/**
 * Created by Martin on 24/11/15.
 */
var app = require('../server.js'),
  request = require('supertest'),
  express = require('express'),
  should = require('should'),
  bodyParser = require('body-parser'),
  testConfig = require('./../app/tests/testConfig.js');

app.use(bodyParser());

describe('Test Mantra with Java compilation', function () {

  this.timeout(testConfig.timeOut);

  it('First test', function (done) {

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

});
