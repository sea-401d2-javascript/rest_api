'use strict';
let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
let request = chai.request;
let expect = chai.expect;
let db = require('../models');
let mongoose = require('mongoose');
process.env.MONGO_URI = 'mongodb://localhost/test-ideas';
let server = require(__dirname+'/../server');
let Idea = db.Idea;
let Student = db.Student;



var token;

describe('RESTful API', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to signup a new user', function(done) {
    chai.request('localhost:3000')
      .post('/signup')
      .send({name:'alem', password:'password'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.data.name).to.eql('alem');
        expect(res.body.data).to.have.property('_id');
        done();
      });
  });

  it('should be able to login a user and produce a token', function(done) {
    chai.request('localhost:3000')
    .post('/login')
    .auth('alem', 'password')
    .end(function(err, res) {
      token = res.body.token;
      expect(err).to.eql(null);
      expect(res.body).to.have.property('token');
      expect(res.body.id.name).to.eql('alem');
      done();
    });
  });

  describe('Needs an existing student and idea to work with', function() {
    beforeEach(function(done) {

      var testIdea = new Idea({sector: 'sports', lang:'c++'});

      testIdea.save((err, idea) => {
        if(err) throw err;
        this.testIdea = idea;
        var student = new Student({name: 'alem', password:'password', ideas: [idea._id]});
        student.save((err, student) => {
          if(err) throw err;
          this.testStudent = student;
          done();
        });
      });
    });

    it('should be able to make an student and idea in a beforeEach block', function() {
      expect(this.testIdea.sector).to.eql('sports');
      expect(this.testIdea).to.have.property('_id');
      expect(this.testStudent.name).to.eql('alem');
      expect(this.testStudent).to.have.property('_id');
    });

    it('should return a student', function(done) {
      var studentId = this.testStudent._id;
      chai.request('localhost:3000')
      .get('/' + studentId)
      .send({token: token})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.data).to.have.property('_id');
        expect(res.body.data._id).to.eql(studentId.toString());
        done();
      });
    });

    it('should be able to delete a student', function(done) {
      var student = this.testStudent._id;
      chai.request('localhost:3000')
        .del('/' + student)
        .send({token: token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.message).to.eql('Student removed');
          done();
        });
    });

    it('should be able to get student ideas', function(done) {
      var student = this.testStudent._id;
      var idea = this.testIdea._id;
      chai.request('localhost:3000')
        .get('/'+student+'/ideas')
        .send({token: token})
        .end(function(err, res) {
          expect(res.text).to.be.a('string');
          done();
        });
    });
    it('should be able to get a student\'s idea', function(done) {
      var student = this.testStudent._id;
      var idea = this.testIdea._id;
      chai.request('localhost:3000')
        .get('/'+student+'/ideas/'+idea)
        .send({token: token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.data).to.have.property('_id');
          done();
        });
    });
    it('should be able to update a student idea', function(done) {
      var student = this.testStudent._id;
      var idea = this.testIdea._id;
      chai.request('localhost:3000')
        .put('/'+student+'/ideas/'+idea)
        .send({token: token, name: 'tom'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('successfully updated!');
          done();
        });
    });

    it('should be able to delete a student\'s idea', function(done) {
      var student = this.testStudent._id;
      var idea = this.testIdea._id;
      chai.request('localhost:3000')
        .del('/'+student+'/ideas/'+idea)
        .send({token: token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('successfully deleted!');
          done();
        });
    });
  });
});
