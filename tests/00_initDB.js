/**
 * Created by Martin on 24/11/15.
 */
var app = require('../server.js'),
  request = require('supertest'),
  express = require('express'),
  should = require('should'),
  bodyParser = require('body-parser'),
  testConfig = require('./../app/tests/testConfig.js'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Group = mongoose.model('Group');

var globalUser1;

describe('Initialize the Mongo database', function () {

  this.timeout(testConfig.timeOut);

  it('Remove all collections', function (done) {
    // removes a collection
    var removeCollection = function (aCollection) {
      var model = mongoose.model(aCollection);
      model.remove().exec();
    };

    // remove all the collections in the DB
    var collectionArray = ['Competition','pageView','Bug','Group','User'];
    for (i=0;i<collectionArray.length;i++) {
      removeCollection(collectionArray[i]);
    }
    done();
  });

  it('Store user Martin', function (done) {
    var aUser = new User({
      firstName: 'Martin',
      lastName: 'Nordio',
      displayName: 'Martin Nordio Name',
      email: 'test@test.com',
      username: 'martinnordio',
      password: '12345678',
      provider: 'local'
    });
    aUser.save(function(err) {
      if (!err) {
        done();
      }
    });
  });

  it('Store user Jorge Aguirre', function (done) {
    var aUser2 = new User({
      firstName: 'Jorge',
      lastName: 'Aguirre',
      displayName: 'Jorge Aguirre',
      email: 'test@test.com',
      username: 'jaguirre',
      password: '12345678',
      provider: 'local'
    });
    aUser2.save(function(err) {
      if (!err) {
        done();
      }
    });
  });

  it('Store user Jorge Padula', function (done) {
    var aUser = new User({
      firstName: 'Jorge',
      lastName: 'Padula',
      displayName: 'Jorge Padula',
      email: 'test@test.com',
      username: 'jpadula',
      password: '12345678',
      provider: 'local'
    });
    globalUser1 = aUser;
    aUser.save(function(err) {
      if (!err) {
        done();
      }
    });
  });

  it('Store a group "ETH1"', function (done) {
    var aGroup = new Group({
      name: "ETH1",
      user: globalUser1,
      number: 1,
      githubAccounts: "jpadula,martinnordio",
      studentsArrayList: ["jpadula,martinnordio"]
    });
    aGroup.save(function(err) {
      if (!err) {
        done();
      }
    });
  });


});
