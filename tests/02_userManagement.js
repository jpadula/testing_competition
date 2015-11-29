/**
 * Created by Martin on 29/11/15.
 */

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

  it('jpadula signs in', function (done) {
    done();
  });

  it('martinnordio signs in', function (done) {
    done();
  });

  it('non existing user cannot signs in', function (done) {
    done();
  });

  it('user "hce" can create an account', function (done) {
    done();
  });

  it('user "hce" can sign in after creating his account', function (done) {
    done();
  });

  it('jpadula signs out', function (done) {
    done();
  });
});

