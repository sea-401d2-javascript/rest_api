'use strict';

process.env.MONGO_URI = 'mongodb://localhost/movie_test';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var request = chai.request;
var expect = chai.expect;

var Movie = require(__dirname + '/../models').Movie;

require(__dirname + '/../server');

describe('testing Movie API', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to add a new movie', function(done) {
    request('localhost:3000')
    .post('/movies')
    .send({
      "name": "Sex, Lies, and Videotape",
      "release_date": "January 20, 1989"
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Sex, Lies, and Videotape');
      expect(Date(res.body.release_date)).to.eql(Date('January 20, 1989'));
      expect(res.body).to.have.property('_id');
      done();
    })
  });

  it('should be able to retrieve list of movies', function(done) {
    request('localhost:3000')
    .get('/movies')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(Array.isArray(res.body.data)).to.eql(true);
      done();
    })
  });

});

describe('need to have existing movie to test with', function(done) {

  beforeEach(function(done) {
    var testMovie = new Movie({"name": "Traffic", "release_date": "December 27, 2000"});
    testMovie.save(function(err, data) {
      if(err) throw err;
      this.testMovie = data;
      done();
    }.bind(this));
  });

  it('should have created movie in forEach block', function(done) {
    expect(this.testMovie.name).to.eql('Traffic');
    expect(this.testMovie).to.have.property('_id');
    done();
  });
  it('should be able to get info on single movie', function(done) {
    expect('not implemented').to.eql(false);
    done();
  })
  it('should be able to update movie', function(done) {
    var id = this.testMovie._id;
    request('localhost:3000')
    .put('/movies/' + id)
    .send({"name": "Traffic", "release_date": "January 5, 2001"})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Traffic');
      expect(Date(res.body.release_date)).to.eql(Date('January 5, 2001'));
      done();
    })
  })
  it('should be able to delete movie', function(done) {
    expect('not implemented').to.eql(false);
    done();
  })
});




// 'use strict';
//
// var chai = require('chai');
// var chaiHttp = require('chai-http');
// chai.use(chaiHttp);
//
// var request = chai.request;
// var expect = chai.expect;
//
// require(__dirname + '/../server');
//
// describe('testing /movies POST route', () => {
//
// });
//
// describe('testing /movies GET route', () => {
//
// });
//
// describe('testing /movies:id GET route', () => {
//
// });
//
// describe('testing /movies:id PUT route', () => {
//
// });
//
// describe('testing /movies:id DELETE route', () => {
//
// });
