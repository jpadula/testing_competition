/**
 * Created by Martin on 29/11/15.
 */
  // to run all tests, run:  npm run-script test

var app = require('../../server.js'),
  request = require('supertest'),
  express = require('express'),
  should = require('should'),
  bodyParser = require('body-parser'),
  testConfig = require('./../../app/tests/testConfig.js');

app.use(bodyParser());

var cookie;
var rioCuartoGpId,argGpId, chGpId, compId,argChCompetitionId;

describe('Test Admin management', function () {

  this.timeout(testConfig.timeOut);

  before('Admin signs in', function (done) {
    request(app)
      .post('/auth/signin')
      .send({username: 'jpadula', password: '12345678'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (error, reply) {
        reply.body.username.should.equal('jpadula');
        reply.body.displayName.should.equal('Jorge Padula');
        reply.body.provider.should.equal('local');
        reply.body.roles[0].should.equal('admin');
        cookie = reply.headers['set-cookie'].pop().split(';')[0]; //.headers['set-cookie'];
        done();
      });
  });


  it('Admin gets list of competitions', function (done) {
    request(app)
      .get('/competitions')
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        reply.body[0].description.should.equal('A competition between Argentina and Switzerland');
        reply.body[0].name.should.equal('ARGvsCH');
        reply.body[0].groupsList.length.should.equal(2); //there are 2 groups in the competition
        argChCompetitionId = reply.body[0]._id;

        done();
      });
  });

  it('Admin gets list of competitions', function (done) {
    request(app)
      .get('/competitions/'+argChCompetitionId)
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        reply.body.description.should.equal('A competition between Argentina and Switzerland');
        reply.body.name.should.equal('ARGvsCH');
        reply.body.groupsList.length.should.equal(2); //there are 2 groups in the competition

        done();
      });
  });

  it('Admin gets list of groups', function (done) {
    request(app)
      .get('/groups')
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        reply.body[0].name.should.equal('ARG');
        reply.body[0].githubAccounts.should.equal('jpadula,jaguirre');
        reply.body[0].studentsArrayList[0].should.equal('jpadula');
        reply.body[0].studentsArrayList[1].should.equal('jaguirre');
        argGpId = reply.body[0]._id;

        reply.body[1].name.should.equal('CH');
        reply.body[1].githubAccounts.should.equal('martinnordio');
        reply.body[1].studentsArrayList[0].should.equal('martinnordio');
        chGpId = reply.body[1]._id;
        done();
      });
  });

  it('Admin gets ARG group', function (done) {
    request(app)
      .get('/groups/'+argGpId)
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        reply.body.name.should.equal('ARG');
        reply.body.githubAccounts.should.equal('jpadula,jaguirre');
        reply.body.studentsArrayList[0].should.equal('jpadula');
        reply.body.studentsArrayList[1].should.equal('jaguirre');
        done();
      });
  });

  it('Admin gets CH group', function (done) {
    request(app)
      .get('/groups/'+chGpId)
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        reply.body.name.should.equal('CH');
        reply.body.githubAccounts.should.equal('martinnordio');
        reply.body.studentsArrayList[0].should.equal('martinnordio');
        done();
      });
  });

  it('Admin creates a group', function (done) {
    var aGroup = {
      name: "Rio Cuarto",
      number: 3,
      githubAccounts: "martinnordio12,jpadula2"
    };
    request(app)
      .post('/groups')
      .set('cookie', cookie)
      .send(aGroup)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        // check the reply is as expected
        reply.body.name.should.equal('Rio Cuarto');
        reply.body.githubAccounts.should.equal("martinnordio12,jpadula2");
        reply.body.studentsArrayList[1].should.equal('martinnordio12');
        reply.body.studentsArrayList[0].should.equal('jpadula2');
        rioCuartoGpId = reply.body._id;
        // check that the group was created in the server
        request(app)
          .get('/groups')
          .set('cookie', cookie)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(error, reply) {
            if (error) return done(error);
            reply.body.length.should.equal(3);
            reply.body[0].name.should.equal('Rio Cuarto');
            reply.body[1].name.should.equal('ARG');
            reply.body[2].name.should.equal('CH');

            done();
          });
      });
  });

  it('Admin updates a group', function (done) {
    // PUT /groups
    var aGroup = {
      name: "Rio Cuarto222",
      number: 3,
      githubAccounts: "martinnordio12,jpadula2"
    };
    request(app)
      .put('/groups/'+rioCuartoGpId)
      .set('cookie', cookie)
      .send(aGroup)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        // check the reply is as expected
        reply.body.name.should.equal('Rio Cuarto222');
        reply.body.githubAccounts.should.equal("martinnordio12,jpadula2");
        reply.body.studentsArrayList[1].should.equal('martinnordio12');
        reply.body.studentsArrayList[0].should.equal('jpadula2');
        // check that the group was created in the server
        request(app)
          .get('/groups')
          .set('cookie', cookie)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(error, reply) {
            if (error) return done(error);
            reply.body.length.should.equal(3);
            reply.body[0].name.should.equal('Rio Cuarto222');
            reply.body[1].name.should.equal('ARG');
            reply.body[2].name.should.equal('CH');
            done();
          });
      });
  });

  it('Admin deletes a group', function (done) {
    // DELETE /groups
    request(app)
      .delete('/groups/'+rioCuartoGpId)
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        // check the reply is as expected
        reply.body.name.should.equal('Rio Cuarto222');
        reply.body.githubAccounts.should.equal("martinnordio12,jpadula2");
        reply.body.studentsArrayList[1].should.equal('martinnordio12');
        reply.body.studentsArrayList[0].should.equal('jpadula2');
        // check that the group was created in the server
        request(app)
          .get('/groups')
          .set('cookie', cookie)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(error, reply) {
            if (error) return done(error);
            reply.body.length.should.equal(2);
            reply.body[0].name.should.equal('ARG');
            reply.body[1].name.should.equal('CH');
            done();
          });
      });
  });

  it('Admin creates a competition', function (done) {
    var aCompetition = {
        "name":"aNewCompetition",
        "description":"<p>Testing Mocha desc</p>",
        "groupsList":[{"_id":argGpId},{"_id":chGpId}],
        "POINTS":{
          "FIRST_BUG_IN_CLASS_C":10,
          "NOT_FIRST_BUG_IN_CLASS_C_BUT_YES_IN_ROUTINE_R":5,
          "NOT_FIRST_BUG_IN_CLASS_C_AND_NOT_FIRST_IN_ROUTINE_R":3,
          "PERSON_WHO_SUBMITTED_AN_ACCEPTED_BUG":2,
          "PERSON_WHO_SUBMITTED_A_REJECTED_BUG":-10
        }
      };
    request(app)
      .post('/competitions')
      .set('cookie', cookie)
      .send(aCompetition)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        // check the reply is as expected
        reply.body.name.should.equal('aNewCompetition');
        reply.body.groupsList.length.should.equal(2);
        compId = reply.body._id;

        // check that the group was created in the server
        request(app)
          .get('/competitions')
          .set('cookie', cookie)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(error, reply) {
            if (error) return done(error);
            reply.body.length.should.equal(2);
            reply.body[0].name.should.equal('aNewCompetition');
            reply.body[1].name.should.equal('ARGvsCH');
            done();
          });
      });
  });

  it('Admin creating a competition that exists fail', function (done) {
    var aCompetition = {
        "name":"aNewCompetition",
        "description":"<p>Testing Mocha desc</p>",
        "groupsList":[{"_id":argGpId},{"_id":chGpId}],
        "POINTS":{
          "FIRST_BUG_IN_CLASS_C":10,
          "NOT_FIRST_BUG_IN_CLASS_C_BUT_YES_IN_ROUTINE_R":5,
          "NOT_FIRST_BUG_IN_CLASS_C_AND_NOT_FIRST_IN_ROUTINE_R":3,
          "PERSON_WHO_SUBMITTED_AN_ACCEPTED_BUG":2,
          "PERSON_WHO_SUBMITTED_A_REJECTED_BUG":-10
        }
      };
    request(app)
      .post('/competitions')
      .set('cookie', cookie)
      .send(aCompetition)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(function(error, reply) {
        reply.status.should.equal(400);
        if(error) return done(error);
        done();
      });
  });


  it('Admin updates a competition', function (done) {
    var aCompetition = {
      "name":"aNewCompetition222"
    };
    request(app)
      .put('/competitions/'+compId)
      .set('cookie', cookie)
      .send(aCompetition)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        // check the reply is as expected
        reply.body.name.should.equal('aNewCompetition222');
        reply.body.groupsList.length.should.equal(2);

        // check that the group was created in the server
        request(app)
          .get('/competitions')
          .set('cookie', cookie)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(error, reply) {
            if (error) return done(error);
            reply.body.length.should.equal(2);
            reply.body[0].name.should.equal('aNewCompetition222');
            reply.body[1].name.should.equal('ARGvsCH');
            done();
          });
      });
  });

/*
  it('Admin updates a competition that fail because the name already exist', function (done) {
      var aCompetition = {
        "name":"aNewCompetition222"
      };
      request(app)
        .put('/competitions/'+compId)
        .set('cookie', cookie)
        .send(aCompetition)
        .expect(400)
        .expect('Content-Type', /json/)
        .end(function(error, reply) {
          reply.status.should.equal(400);
          if(error) return done(error);
          done();
        });
    });
*/

  it('Admin deletes a competition', function (done) {
    request(app)
      .delete('/competitions/'+compId)
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(error, reply) {
        if(error) return done(error);
        // check the reply is as expected
        reply.body.name.should.equal('aNewCompetition222');
        reply.body.groupsList.length.should.equal(2);

        // check that the group was created in the server
        request(app)
          .get('/competitions')
          .set('cookie', cookie)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(error, reply) {
            if (error) return done(error);
            reply.body.length.should.equal(1);
            reply.body[0].name.should.equal('ARGvsCH');
            done();
          });
      });
  });

  it('Non admin cannot create groups', function (done) {
    // POST /groups
    request(app)
      .post('/auth/signin')
      .send({username: 'jaguirre', password: '12345678'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (error, reply) {
        reply.body.username.should.equal('jaguirre');
        reply.body.displayName.should.equal('Jorge Aguirre');
        reply.body.provider.should.equal('local');
        reply.body.roles[0].should.equal('user');
        var cookie2 = reply.headers['set-cookie'].pop().split(';')[0]; //.headers['set-cookie'];
        var aGroup = {
          name: "aNewGroup",
          number: 4,
          githubAccounts: "martinnordio123"
        };
        request(app)
          .post('/groups')
          .set('cookie', cookie2)
          .send(aGroup)
          .expect('Content-Type', /json/)
          .expect(403)
          .end(function(error, reply) {
            if (error) return done(error);
            reply.body.message.should.equal('User is not authorized');
            done();
          });
      });
  });

});
