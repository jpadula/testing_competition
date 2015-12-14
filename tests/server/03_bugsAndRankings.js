/**
 * Created by Martin on 29/11/15.
 */
var app = require('../../server.js'),
  request = require('supertest'),
  express = require('express'),
  should = require('should'),
  bodyParser = require('body-parser'),
  testConfig = require('./../../app/tests/testConfig.js');

app.use(bodyParser());

var cookieJPadula, cookieMNordio, cookieJAguirre;

var currentCompetition;

var groupCH,groupARG;

var userJPadula,userMNordio,userJAguirre;

describe('Test Bugs and Rankings', function () {

  this.timeout(testConfig.timeOut);
  it('jpadula,martinnordio,jaguirre signs in', function (done) {
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
        userJPadula= reply.body;
        cookieJPadula = reply.headers['set-cookie'].pop().split(';')[0]; //.headers['set-cookie'];
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
            userMNordio = reply.body;
            cookieMNordio = reply.headers['set-cookie'].pop().split(';')[0]; //.headers['set-cookie'];
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
                  userJAguirre = reply.body;
                  cookieJAguirre = reply.headers['set-cookie'].pop().split(';')[0]; //.headers['set-cookie'];
                  request(app)
                    .get('/competitions')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (error, reply) {
                     reply.body.length.should.equal(1);
                     reply.body[0].name.should.equal("ARGvsCH");
                     reply.body[0].description.should.equal("A competition between Argentina and Switzerland");
                     currentCompetition = reply.body[0];
                    request(app)
                      .get('/groups')
                      .expect('Content-Type', /json/)
                      .expect(200)
                      .end(function (error, reply) {
                       reply.body.length.should.equal(2);
                       
                       reply.body[0].name.should.equal("ARG");
                       reply.body[0].githubAccounts.should.equal("jpadula,jaguirre");
                       
                       reply.body[1].name.should.equal("CH");
                       reply.body[1].githubAccounts.should.equal("martinnordio");
                       groupCH = reply.body[1];
                       groupARG = reply.body[0]

                       done();
                    });
                  });
              });
        });
      });
    });


it('My Competition List should be equal to 1 and the name should be ARGvsCH', function (done) {
  request(app)
    .get('/myCompetitions')
    .set("cookie",cookieJPadula)
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (error, reply) {
     reply.body.length.should.equal(1);
     reply.body[0].name.should.equal("ARGvsCH");
     reply.body[0].description.should.equal("A competition between Argentina and Switzerland");
     done();
    });
});

// CH Group: martinnordio
// ARG Group : jpadula, jaguirre
  var jpadulaBug;
  it('ARG Group (jpadula) report a unique bug to CH Group', function (done) {
    var bug = {
      className: "Bug C1 for CH Group",
      routineName: "Bug R1 for CH Group",
      description: "Bug D1 for CH Group",
      competition: currentCompetition._id,
      group_reported: groupCH._id,
      groupName: groupARG.name,
      title: "Bug T1 for CH Group",
      groupReportedName : groupCH.name,
      competitionName : currentCompetition.name,
      group : groupARG._id
    };

    request(app)
      .post('/bugs')
      .send(bug)
      .expect('Content-Type', /json/)
      .set("cookie",cookieJPadula)
      .expect(200)
      .end(function (error, reply) {
       reply.body.title.should.equal("Bug T1 for CH Group");
       reply.body.className.should.equal("Bug C1 for CH Group");
       reply.body.routineName.should.equal("Bug R1 for CH Group");

       reply.body.points.should.equal(10);
       reply.body.totalGoldMedals.should.equal(1);
       reply.body.totalSilverMedals.should.equal(0);

       jpadulaBug = reply.body;

       done();

    });
  });

// Ranking should be: [<user name> || <group name>,<#reported bugs>, <#points>,<#gold medals> || [],<#silver medals> || []]
/*
* data lenght = 1
* Users Ranking: (jpadula,1,10,1,0)
* Groups Ranking: (ARG,1,10,1,0)
* Most Bugs Ranking: (CH,1,10)
*/

  it('Rankings status after report jpadula bug', function (done) {
    var config = {
      competition:currentCompetition._id,
      competitionName:currentCompetition.name
    };

    request(app)
      .post('/bugs/getUsersRanking')
      .send(config)
      .set('cookie',cookieJPadula)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (error, reply) {
        reply.body.length.should.equal(1);
        reply.body[0].user.should.equal(userJPadula.displayName);
        reply.body[0].totalGoldMedals.should.equal(1);
        reply.body[0].totalSilverMedals.should.equal(0);
        reply.body[0].totalReportedBugPoints.should.equal(10);
        reply.body[0].totalPoints.should.equal(10);
        reply.body[0].bugsReported.should.equal(1);
        reply.body[0].totalExtraPoints.should.equal(0);

        request(app)
        .post('/bugs/getGroupsRanking')
        .send(config)
        .set('cookie',cookieJPadula)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (error, reply) {
          reply.body.length.should.equal(1);
          reply.body[0].group.should.equal(groupARG.name);
          reply.body[0].totalGoldMedals.should.equal(1);
          reply.body[0].totalSilverMedals.should.equal(0);
          reply.body[0].totalReportedBugPoints.should.equal(10);
          reply.body[0].totalPoints.should.equal(10);
          reply.body[0].bugsReported.should.equal(1);
          reply.body[0].totalExtraPoints.should.equal(0);

          request(app)
          .post('/bugs/getGroupsWithMoreBugsRanking')
          .send(config)
          .set('cookie',cookieJPadula)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (error, reply) {
            reply.body.length.should.equal(1);
            reply.body[0].group.should.equal(groupCH.name);
            reply.body[0].totalReportedBugPoints.should.equal(10);
            reply.body[0].totalPoints.should.equal(10);
            reply.body[0].bugsReported.should.equal(1);

           done();
          });
        });
    });
  });

  var jaguirreBug;
  it('ARG Group (jaguirre) report a repeated class bug to CH Group', function (done) {
    var bug = {
      className: "Bug C1 for CH Group",
      routineName: "Bug R2 for CH Group",
      description: "Bug D1 for CH Group",
      competition: currentCompetition._id,
      group_reported: groupCH._id,
      groupName: groupARG.name,
      title: "Bug T2 for CH Group",
      groupReportedName : groupCH.name,
      competitionName : currentCompetition.name,
      group : groupARG._id
    };

    request(app)
      .post('/bugs')
      .send(bug)
      .expect('Content-Type', /json/)
      .set("cookie",cookieJAguirre)
      .expect(200)
      .end(function (error, reply) {
       jaguirreBug = reply.body;
       reply.body.title.should.equal("Bug T2 for CH Group");
       reply.body.className.should.equal("Bug C1 for CH Group");
       reply.body.routineName.should.equal("Bug R2 for CH Group");

       reply.body.points.should.equal(5);
       reply.body.totalGoldMedals.should.equal(0);
       reply.body.totalSilverMedals.should.equal(1);

       done();

    });
  });

// Ranking should be: [<user name> || <group name>,<#reported bugs>, <#points>,<#gold medals> || [],<#silver medals> || []]
/*
* data lenght = 1|2
* Users Ranking: [(jpadula,1,10,1,0),(jaguirre,1,5,0,1)]
* Groups Ranking: (ARG,1,15,1,1)
* Most Bugs Ranking: (CH,2,15)
*/

  it('Rankings status after report jaguirre bug', function (done) {
    var config = {
      competition:currentCompetition._id,
      competitionName:currentCompetition.name
    };

    request(app)
      .post('/bugs/getUsersRanking')
      .send(config)
      .set('cookie',cookieJPadula)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (error, reply) {
        reply.body.length.should.equal(2);
        reply.body[0].user.should.equal(userJPadula.displayName);
        reply.body[0].totalGoldMedals.should.equal(1);
        reply.body[0].totalSilverMedals.should.equal(0);
        reply.body[0].totalReportedBugPoints.should.equal(10);
        reply.body[0].totalPoints.should.equal(10);
        reply.body[0].bugsReported.should.equal(1);
        reply.body[0].totalExtraPoints.should.equal(0);

        reply.body[1].user.should.equal(userJAguirre.displayName);
        reply.body[1].totalGoldMedals.should.equal(0);
        reply.body[1].totalSilverMedals.should.equal(1);
        reply.body[1].totalReportedBugPoints.should.equal(5);
        reply.body[1].totalPoints.should.equal(5);
        reply.body[1].bugsReported.should.equal(1);
        reply.body[1].totalExtraPoints.should.equal(0);

        request(app)
        .post('/bugs/getGroupsRanking')
        .send(config)
        .set('cookie',cookieJPadula)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (error, reply) {
          reply.body.length.should.equal(1);
          reply.body[0].group.should.equal(groupARG.name);
          reply.body[0].totalGoldMedals.should.equal(1);
          reply.body[0].totalSilverMedals.should.equal(1);
          reply.body[0].totalReportedBugPoints.should.equal(15);
          reply.body[0].totalPoints.should.equal(15);
          reply.body[0].bugsReported.should.equal(2);
          reply.body[0].totalExtraPoints.should.equal(0);

          request(app)
          .post('/bugs/getGroupsWithMoreBugsRanking')
          .send(config)
          .set('cookie',cookieJPadula)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (error, reply) {
            reply.body.length.should.equal(1);
            reply.body[0].group.should.equal(groupCH.name);
            reply.body[0].totalReportedBugPoints.should.equal(15);
            reply.body[0].totalPoints.should.equal(15);
            reply.body[0].bugsReported.should.equal(2);
           done();
          });
        });
    });
  });


  it('CH Group (martinnordio) accept a repeated bug by jaguirre', function (done) {
    var acceptedBug = {
      status:"APPROVED",
      reason: "Test Bug Accepted"
    };

    request(app)
      .put('/bugs/'+jaguirreBug._id)
      .send(acceptedBug)
      .expect('Content-Type', /json/)
      .set("cookie",cookieMNordio)
      .expect(200)
      .end(function (error, reply) {
       reply.body.status.should.equal("APPROVED");
       reply.body.statusReason.should.equal("Test Bug Accepted");

       done();

    });
  });

  it('List of bugs should be 2', function (done) {
    request(app)
      .get('/bugs')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (error, reply) {
       reply.body.length.should.equal(2);
       done();
    });
  });

// Ranking should be: [<user name> || <group name>,<#reported bugs>, <#points>,<#gold medals> || [],<#silver medals> || []]
/*
* data lenght = 1|2
* Users Ranking: [(jpadula,1,10,1,0),(jaguirre,1,7,0,1)]
* Groups Ranking: (ARG,1,17,1,1)
* Most Bugs Ranking: (CH,2,17)
*/

  it('Rankings status after report martinnordio accepted the jaguirre bug', function (done) {
    var config = {
      competition:currentCompetition._id,
      competitionName:currentCompetition.name
    };

    request(app)
      .post('/bugs/getUsersRanking')
      .send(config)
      .set('cookie',cookieJPadula)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (error, reply) {
        reply.body.length.should.equal(2);
        reply.body[0].user.should.equal(userJPadula.displayName);
        reply.body[0].totalGoldMedals.should.equal(1);
        reply.body[0].totalSilverMedals.should.equal(0);
        reply.body[0].totalReportedBugPoints.should.equal(10);
        reply.body[0].totalPoints.should.equal(10);
        reply.body[0].bugsReported.should.equal(1);
        reply.body[0].totalExtraPoints.should.equal(0);

        reply.body[1].user.should.equal(userJAguirre.displayName);
        reply.body[1].totalGoldMedals.should.equal(0);
        reply.body[1].totalSilverMedals.should.equal(1);
        reply.body[1].totalReportedBugPoints.should.equal(5);
        reply.body[1].totalPoints.should.equal(7);
        reply.body[1].bugsReported.should.equal(1);
        reply.body[1].totalExtraPoints.should.equal(2);

        request(app)
        .post('/bugs/getGroupsRanking')
        .send(config)
        .set('cookie',cookieJPadula)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (error, reply) {
          reply.body.length.should.equal(1);
          reply.body[0].group.should.equal(groupARG.name);
          reply.body[0].totalGoldMedals.should.equal(1);
          reply.body[0].totalSilverMedals.should.equal(1);
          reply.body[0].totalReportedBugPoints.should.equal(15);
          reply.body[0].totalPoints.should.equal(17);
          reply.body[0].bugsReported.should.equal(2);
          reply.body[0].totalExtraPoints.should.equal(2);

          request(app)
          .post('/bugs/getGroupsWithMoreBugsRanking')
          .send(config)
          .set('cookie',cookieJPadula)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (error, reply) {
            reply.body.length.should.equal(1);
            reply.body[0].group.should.equal(groupCH.name);
            reply.body[0].totalReportedBugPoints.should.equal(15);
            reply.body[0].totalPoints.should.equal(17);
            reply.body[0].bugsReported.should.equal(2);
           done();
          });
        });
    });
  });

  it('CH Group (martinnordio) reject the jpadula bug', function (done) {
    var rejectedBug = {
      status:"REJECTED",
      reason: "Test Bug Rejected"
    };

    request(app)
      .put('/bugs/'+jpadulaBug._id)
      .send(rejectedBug)
      .expect('Content-Type', /json/)
      .set("cookie",cookieMNordio)
      .expect(200)
      .end(function (error, reply) {
       reply.body.status.should.equal("REJECTED");
       reply.body.statusReason.should.equal("Test Bug Rejected");

       done();

    });
  });

// Ranking should be: [<user name> || <group name>,<#reported bugs>, <#points>,<#gold medals> || [],<#silver medals> || []]
/*
* data lenght = 1|2
* Users Ranking: [(jpadula,1,0,1,0),(jaguirre,1,7,0,1)]
* Groups Ranking: (ARG,1,7,1,1)
* Most Bugs Ranking: (CH,2,7)
*/

  it('Rankings status after report martinnordio rejected the jpadula bug', function (done) {
    var config = {
      competition:currentCompetition._id,
      competitionName:currentCompetition.name
    };

    request(app)
      .post('/bugs/getUsersRanking')
      .send(config)
      .set('cookie',cookieJPadula)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (error, reply) {
        reply.body.length.should.equal(2);
        reply.body[0].user.should.equal(userJAguirre.displayName);
        reply.body[0].totalGoldMedals.should.equal(0);
        reply.body[0].totalSilverMedals.should.equal(1);
        reply.body[0].totalReportedBugPoints.should.equal(5);
        reply.body[0].totalPoints.should.equal(7);
        reply.body[0].bugsReported.should.equal(1);
        reply.body[0].totalExtraPoints.should.equal(2);

        reply.body[1].user.should.equal(userJPadula.displayName);
        reply.body[1].totalGoldMedals.should.equal(1);
        reply.body[1].totalSilverMedals.should.equal(0);
        reply.body[1].totalReportedBugPoints.should.equal(10);
        reply.body[1].totalPoints.should.equal(0);
        reply.body[1].bugsReported.should.equal(1);
        reply.body[1].totalExtraPoints.should.equal(-10);


        request(app)
        .post('/bugs/getGroupsRanking')
        .send(config)
        .set('cookie',cookieJPadula)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (error, reply) {
          reply.body.length.should.equal(1);
          reply.body[0].group.should.equal(groupARG.name);
          reply.body[0].totalGoldMedals.should.equal(1);
          reply.body[0].totalSilverMedals.should.equal(1);
          reply.body[0].totalReportedBugPoints.should.equal(15);
          reply.body[0].totalPoints.should.equal(7);
          reply.body[0].bugsReported.should.equal(2);
          reply.body[0].totalExtraPoints.should.equal(-8);

          request(app)
          .post('/bugs/getGroupsWithMoreBugsRanking')
          .send(config)
          .set('cookie',cookieJPadula)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (error, reply) {
            reply.body.length.should.equal(1);
            reply.body[0].group.should.equal(groupCH.name);
            reply.body[0].totalReportedBugPoints.should.equal(15);
            reply.body[0].totalPoints.should.equal(7);
            reply.body[0].bugsReported.should.equal(2);
           done();
          });
        });
    });
  });

//TODO:
/*
* Falta que martinnordio reporte un bug
* jpadula acepta ese bug
* jpadula reporta un bug que no es unico
* chequeo de ranking final
*/

});