'use strict';
// var fs = require('fs');
let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
let request = chai.request;
let expect = chai.expect;

// let DB_PORT = require('../.config').DB_PORT;
let PORT = process.env.PORT || require('../.config').PORT;
// let mongoose = require('mongoose');
let newMovie = {name: 'Paul Blart', imdb: 9.9};
let newSnack = {name: 'pho', description: 'This delicious soup is made of beef and magic'};

describe('/movies resource routing tests', function() {
  this.timeout(0); // due to latency with mongodb

  it('should send back array of movie objects with GET request', (done) => {
    request('localhost:' + PORT)
      .get('/movies')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(typeof res.body).to.eql('object');
        expect(res.body.length).to.not.eql(NaN);
        expect(res.body[0]).to.have.property('id');
        done();
      });
  });

  it('should create and retrieve new movie document', (done) => {
    request('localhost:' + PORT)
      .post('/movies')
      .send(newMovie)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.eql(newMovie.name);
        newMovie.id = res.body.id;
        request('localhost:' + PORT)
          .get('/movies/'+newMovie.id)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('id');
            expect(res.body.name).to.eql(newMovie.name);
            done();
          });
      });
  });

  it('should delete the test document', (done) => {
    request('localhost:' + PORT)
      .delete('/movies/' + newMovie.id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.eql(newMovie.name);
        newMovie.id = res.body.id;
        request('localhost:' + PORT)
          .get('/movies/' + newMovie.id)
          .end((err, res) => {
            expect(res.body).to.eql({});
            done();
          });
      });
  });
});

describe('/snacks resource routing tests', function() {
  this.timeout(0); // due to latency with mongodb

  it('should send back array of snack objects with GET request', (done) => {
    request('localhost:' + PORT)
      .get('/snacks')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(typeof res.body).to.eql('object');
        expect(res.body.length).to.not.eql(NaN);
        expect(res.body[0]).to.have.property('id');
        done();
      });
  });

  it('should create and retrieve new snack document', (done) => {
    request('localhost:' + PORT)
      .post('/snacks')
      .send(newSnack)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.eql(newSnack.name);
        newSnack.id = res.body.id;
        request('localhost:' + PORT)
          .get('/snacks/'+newSnack.id)
          .end((err, res) => {
            expect(err).to.eql(null);
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('id');
            expect(res.body.name).to.eql(newSnack.name);
            done();
          });
      });
  });

  it('should delete the test document', (done) => {
    request('localhost:' + PORT)
      .delete('/snacks/' + newSnack.id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.eql(newSnack.name);
        newSnack.id = res.body.id;
        request('localhost:' + PORT)
          .get('/snacks/' + newSnack.id)
          .end((err, res) => {
            expect(res.body).to.eql({});
            done();
          });
      });
  });
});
