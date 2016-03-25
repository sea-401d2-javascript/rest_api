'use strict';
let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
let request = chai.request;
let expect = chai.expect;
let mongoose = require('mongoose');
process.env.MONGO_URI = 'mongodb://localhost:27017/test-ideas';
let server = require(__dirname+'/../server');
let Idea = require('../models/ideas');





describe('Ideas RESTful API', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a new idea', function(done) {
    chai.request('localhost:3000')
      .post('/:student/ideas')
      .send({sector: 'stocks', lang: 'lisp'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.sector).to.eql('stocks');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should get an array of ideas', function(done) {
    chai.request('localhost:3000')
    .get('/:student/ideas')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(Array.isArray(res.body.data)).to.eql(true);

      done();
    });
  });

  describe('Needs an existing idea to work with', function() {
    beforeEach(function(done) {
      var testIdea = new Idea({sector: 'health', lang:'c#'});
      testIdea.save(function(err, data) {
        if(err) throw err;

        this.testIdea = data;
        done();
      }.bind(this));
    });

    it('should be able to make an idea in a beforeEach block', function() {
      expect(this.testIdea.sector).to.eql('health');
      expect(this.testIdea).to.have.property('_id');
    });

    it('should update an idea', function(done) {
      var id = this.testIdea._id;
      chai.request('localhost:3000')
      .put('/:student/ideas/' + id)
      .send({sector: 'private', lang:'c#'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('successfully updated!');
        done();
      });
    });

    it('should be able to delete an idea', function(done) {
      chai.request('localhost:3000')
        .del('/:student/ideas/' + this.testIdea._id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('successfully deleted!');
          done();
        });
    });
  });
});
