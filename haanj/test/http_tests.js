'use strict';
require(__dirname + '/../index');

// var fs = require('fs');
let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
let request = chai.request;
let expect = chai.expect;

// let DB_PORT = require('../.config').DB_PORT;
let S_PORT = Number(process.env.S_PORT) || require('../.config').S_PORT;
// let mongoose = require('mongoose');
let newMovie = {name: 'Paul Blart', imdb: 9.9};
let newSnack = {name: 'pho', ingredients: ['beef', 'magic']};

describe('/movies resource routing tests', function() {
  this.timeout(0); // due to latency with mongodb

  it('should send back array of movie objects with GET request', (done) => {
    request('localhost:' + S_PORT)
      .get('/movies')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(typeof res.body).to.eql('object');
        expect(res.body.length).to.not.eql(NaN);
        expect(res.body[0]).to.have.property('_id');
        done();
      });
  });

  it('should create and retrieve new movie document', (done) => {
    request('localhost:' + S_PORT)
      .post('/movies')
      .send(newMovie)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.name).to.eql(newMovie.name);
        newMovie._id = res.body._id;
        request('localhost:' + S_PORT)
          .get('/movies/'+newMovie._id)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('_id');
            expect(res.body.name).to.eql(newMovie.name);
            done();
          });
      });
  });

  it('should delete the test document', (done) => {
    request('localhost:' + S_PORT)
      .delete('/movies/' + newMovie._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.name).to.eql(newMovie.name);
        newMovie._id = res.body._id;
        request('localhost:' + S_PORT)
          .get('/movies/' + newMovie._id)
          .end((err, res) => {
            expect(res.body).to.eql(null);
            done();
          });
      });
  });
});

describe('/snacks resource routing tests', function() {
  this.timeout(0); // due to latency with mongodb

  it('should send back array of snack objects with GET request', (done) => {
    request('localhost:' + S_PORT)
      .get('/snacks')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(typeof res.body).to.eql('object');
        expect(res.body.length).to.not.eql(NaN);
        expect(res.body[0]).to.have.property('_id');
        done();
      });
  });

  it('should create and retrieve new snack document', (done) => {
    request('localhost:' + S_PORT)
      .post('/snacks')
      .send(newSnack)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.name).to.eql(newSnack.name);
        newSnack._id = res.body._id;
        request('localhost:' + S_PORT)
          .get('/snacks/'+newSnack._id)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('_id');
            expect(res.body.name).to.eql(newSnack.name);
            done();
          });
      });
  });

  it('should delete the test document', (done) => {
    request('localhost:' + S_PORT)
      .delete('/snacks/' + newSnack._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id');
        expect(res.body.name).to.eql(newSnack.name);
        newSnack._id = res.body._id;
        request('localhost:' + S_PORT)
          .get('/snacks/' + newSnack._id)
          .end((err, res) => {
            expect(res.body).to.eql(null);
            done();
          });
      });
  });
});

describe('/suggest resource routing tests', function() {
  this.timeout(0); // due to latency with mongodb
  it('should test the /suggest route', (done) => {
    request('localhost:' + S_PORT)
      .get('/suggest')
      .end((err,res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('movie');
        expect(res.body).to.have.property('snack');
        done();
      });
  });
});
