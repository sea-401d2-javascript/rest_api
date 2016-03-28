'use strict';

const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
chai.use(chaihttp);
const request = chai.request;
const expect = chai.expect;

process.env.MONGO_DB = 'mongodb://localhost/test';
require('./../server');

describe('Integration Tests (API Routes)', () => {
  var authToken,
    bar_id;

  before((done) => {
    request('localhost:3000')
      .post('/signup')
      .send({
        name: 'Donald Knuth',
        email: 'taocp@cs.stanford.edu',
        password: 'grammar12'
      })
      .end((err, res) => {
        if (err) console.log(err);
        authToken = res.body.token;
        done();
      });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  describe('Test bar routes:', () => {
    it('should deny access without an authorization token', (done) => {
      request('localhost:3000')
        .post('/bars')
        .send({
          name: 'The Crocodile',
          neighborhood: 'Belltown',
          hours: '6pm - 2:30am'
        })
        .end((err, res) => {
          expect(err.status).to.eql(401);
          expect(res.body.msg).to.equal('Authentication failed');
          done();
        });
    });

    it('should create a new bar', (done) => {
      request('localhost:3000')
        .post('/bars')
        .set('token', authToken)
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
        .set('token', authToken)
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
        .set('token', authToken)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(Array.isArray(res.body.data)).to.eql(true);
          done();
        });
    });

    it('should get a bar', (done) => {
      request('localhost:3000')
        .get('/bars/' + bar_id)
        .set('token', authToken)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(res.body.name).to.equal('Hatties Hat');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('should update a bar', (done) => {
      request('localhost:3000')
        .put('/bars/' + bar_id)
        .set('token', authToken)
        .send({neighborhood: 'Ballard Ave'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should delete a bar', (done) => {
      request('localhost:3000')
      .del('/bars/' + bar_id)
      .set('token', authToken)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('bar removed');
        done();
      });
    });
  });

  describe('Test band routes:', () => {

    let band_id = '';
    it('should create a new band', (done) => {
      request('localhost:3000')
        .post('/bands')
        .set('token', authToken)
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
        .set('token', authToken)
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
        .set('token', authToken)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(Array.isArray(res.body.data)).to.eql(true);
          done();
        });
    });

    it('should update a band', (done) => {
      request('localhost:3000')
        .put('/bands/' + band_id)
        .set('token', authToken)
        .send({city: 'Den Hague'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should delete a band', (done) => {
      request('localhost:3000')
      .del('/bands/' + band_id)
      .set('token', authToken)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('band removed');
        done();
      });
    });
  });

});
