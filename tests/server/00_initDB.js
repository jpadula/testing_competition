/**
 * Created by Martin on 24/11/15.
 */
var app = require('../../server.js'),
  request = require('supertest'),
  express = require('express'),
  should = require('should'),
  bodyParser = require('body-parser'),
  testConfig = require('./../../app/tests/testConfig.js'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Group = mongoose.model('Group');
  Competition = mongoose.model('Competition');

var globalUser1,globalARGGroup, globalCHGroup;

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
      provider: 'local',
      roles: ["admin","user"]
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
      provider: 'local',
      roles: ["user"]
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
      provider: 'local',
      roles: ["admin","user"]
    });
    globalUser1 = aUser;
    aUser.save(function(err) {
      if (!err) {
        done();
      }
    });
  });

  it('Store a group "CH"', function (done) {
    var aGroup = new Group({
      name: "CH",
      user: globalUser1,
      number: 1,
      githubAccounts: "martinnordio",
      studentsArrayList: ["martinnordio"]
    });
    globalCHGroup = aGroup;
    aGroup.save(function(err) {
      if (!err) {
        done();
      }
    });
  });

  it('Store a group "ARG"', function (done) {
    var aGroup = new Group({
      name: "ARG",
      user: globalUser1,
      number: 1,
      githubAccounts: "jpadula,jaguirre",
      studentsArrayList: ["jpadula","jaguirre"]
    });
    globalARGGroup = aGroup;
    aGroup.save(function(err) {
      if (!err) {
        done();
      }
    });
  });

  it('Store a competition "AGRvsCH"', function (done) {
    var aCompetition = new Competition({
      name: "ARGvsCH",
      description:"A competition between Argentina and Switzerland",
      groupsList: [globalARGGroup,globalCHGroup],
      POINTS : {
        FIRST_BUG_IN_CLASS_C: 10,
        NOT_FIRST_BUG_IN_CLASS_C_BUT_YES_IN_ROUTINE_R:5,
        NOT_FIRST_BUG_IN_CLASS_C_AND_NOT_FIRST_IN_ROUTINE_R: 3,
        PERSON_WHO_SUBMITTED_AN_ACCEPTED_BUG: 2,
        PERSON_WHO_SUBMITTED_A_REJECTED_BUG: -10
      },
      bugs: [],
      user: globalUser1
    });
    aCompetition.save(function(err) {
      if (!err) {
        done();
      }
    });
  });

});
