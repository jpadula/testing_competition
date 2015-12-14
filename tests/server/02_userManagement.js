/**
 * Created by Martin on 29/11/15.
 */
var app = require('../../server.js'),
  request = require('supertest'),
  express = require('express'),
  should = require('should'),
  bodyParser = require('body-parser'),
  testConfig = require('./../../app/tests/testConfig.js');

var cookie;

app.use(bodyParser());

describe('Test User Management', function () {

  this.timeout(testConfig.timeOut);

  it('jpadula signs in', function (done) {
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
        reply.body.roles[1].should.equal('user');
        cookie = reply.headers['set-cookie'].pop().split(';')[0]; //.headers['set-cookie'];
        done();
      });
  });

  it('martinnordio signs in', function (done) {
    request(app)
      .post('/auth/signin')
      .send({username: 'martinnordio', password: '12345678'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (error, reply) {
        reply.body.username.should.equal('martinnordio');
        reply.body.displayName.should.equal('Martin Nordio Name');
        reply.body.provider.should.equal('local');
        reply.body.roles[0].should.equal('admin');
        reply.body.roles[1].should.equal('user');

        done();
      });
  });

  it('non existing user cannot signs in', function (done) {
    request(app)
      .post('/auth/signin')
      .send({username: 'hce', password: '12345678'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (error, reply) {
        reply.body.message.should.equal("Unknown user or invalid password");
        done();
      });
  });

  it('user "hce" can create an account', function (done) {
    var hceUser = {
      firstName: "hce firstName",
      lastName: "hce lastName",
      email: "hce@hce.com",
      username: "hce",
      password: "12345678"
    };

    request(app)
      .post('/auth/signup')
      .send(hceUser)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (error, reply) {
        reply.body.displayName.should.equal('hce firstName hce lastName');
        reply.body.provider.should.equal('local');
        reply.body.username.should.equal('hce');
        reply.body.roles.length.should.equal(1);
        reply.body.roles[0].should.equal("user");
        reply.body.email.should.equal("hce@hce.com");
        reply.body.lastName.should.equal("hce lastName");
        reply.body.firstName.should.equal("hce firstName");
        done();
    });
  });

  it('user "hce" can sign in after creating his account', function (done) {
      request(app)
      .post('/auth/signin')
      .send({username: 'hce', password: '12345678'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (error, reply) {
        reply.body.username.should.equal('hce');
        reply.body.displayName.should.equal('hce firstName hce lastName');
        reply.body.provider.should.equal('local');
        reply.body.roles[0].should.equal('user');
        done();
      });
  });


  it('jpadula signs out', function (done) {
    request(app)
      .get('/auth/signout')
      .set('cookie', cookie)
      .expect('Content-Type', /json/)
      .end(function (error, reply) {
        request(app)
        .get('/api/logs')
        .expect('Content-Type', /json/)
        .end(function (error, reply) {
          reply.status.should.be.equal(401);
          reply.body.message.should.equal('User is not logged in');
          done();
        });
      });
  });

});


