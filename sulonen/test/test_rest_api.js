'use strict';

const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
chai.use(chaihttp);
const request = chai.request;
const expect = chai.expect;

process.env.MONGO_DB = 'mongodb://localhost/test';
require('./../server');

describe('REST API Integration Tests', () => {
  after(function(done) {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  describe('test bar routes', () => {

    let bar_id = '';
    it('should create a new bar', (done) => {
      request('localhost:3000')
        .post('/bars')
        .send({
          name: 'Hatties Hat',
          neighborhood: 'Ballard',
          hours: '9am - 3am'
        })
        .end((err, res) => {
          bar_id = res.body._id;
          expect(err).to.eql(null);
          expect(res.body.name).to.equal('Hatties Hat');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('should create another bar', (done) => {
      request('localhost:3000')
        .post('/bars')
        .send({
          name: 'Tractor Tavern',
          neighborhood: 'Ballard',
          hours: '5pm - 3am'
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.name).to.equal('Tractor Tavern');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('should get an array of bars', (done) => {
      request('localhost:3000')
        .get('/bars')
        .end(function(err, res) {
          console.log(res.body);
          expect(err).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(Array.isArray(res.body.data)).to.eql(true);
          done();
        });
    });

    it('should get a bar', (done) => {
      request('localhost:3000')
        .get('/bars/' + bar_id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.name).to.equal('Hatties Hat');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('should update a bar', (done) => {
      request('localhost:3000')
        .put('/bars/' + bar_id)
        .send({neighborhood: 'Ballard Ave'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a bar', (done) => {
      request('localhost:3000')
      .del('/bars/' + bar_id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('bar removed');
        done();
      });
    });
  });

  describe('test band routes', () => {

    let band_id = '';
    it('should create a new band', (done) => {
      request('localhost:3000')
        .post('/bands')
        .send({
          name: 'Soundgarden',
          city: 'Seattle',
          country: 'United States',
          genre: 'Grunge',
          bar: 'Hatties Hat'
        })
        .end((err, res) => {
          band_id = res.body._id;
          expect(err).to.eql(null);
          expect(res.body.name).to.equal('Soundgarden');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('should create another band', (done) => {
      request('localhost:3000')
        .post('/bands')
        .send({
          name: 'Guilt Machine',
          city: 'The Electric Castle',
          country: 'Netherlands',
          genre: 'Industrial',
          bar: 'Tractor Tavern'
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.name).to.equal('Guilt Machine');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('should get an array of bands', (done) => {
      request('localhost:3000')
        .get('/bands')
        .end(function(err, res) {
          console.log(res.body);
          expect(err).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(Array.isArray(res.body.data)).to.eql(true);
          done();
        });
    });

    it('should update a band', (done) => {
      request('localhost:3000')
        .put('/bands/' + band_id)
        .send({city: 'Den Hague'})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a band', (done) => {
      request('localhost:3000')
      .del('/bands/' + band_id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('band removed');
        done();
      });
    });
  });

});
