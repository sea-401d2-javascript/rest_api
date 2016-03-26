'use strict';

const mongoose = require('mongoose');
const chai = require('chai');
const chaihttp = require('chai-http');
chai.use(chaihttp);
const request = chai.request;
const expect = chai.expect;

process.env.MONGO_DB = 'mongodb://localhost/test';
require('./../server');

describe('Integration Tests (User Routes)', () => {
  after(function(done) {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  var ada_id, alan_id;
  describe('test user routes', () => {

    it('should create a new user', (done) => {
      request('localhost:3000')
        .post('/signup')
        .send({
          username: 'Ada Byron',
          email: 'ada@babbage.io', 
          password: 'daddy123'
        })
        .end((err, res) => {
          ada_id = res.body._id;
          expect(err).to.eql(null);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should create another user', (done) => {
      request('localhost:3000')
        .post('/signup')
        .send({
          username: 'Alan Turing',
          email: 'turing@hut8.co.uk',
          password: 'apple123'
        })
        .end((err, res) => {
          alan_id = res.body._id;
          expect(err).to.eql(null);
          expect(res.body).to.have.property('token');
          done();
        });
    });

    it('should get an array of users', (done) => {
      request('localhost:3000')
        .get('/users')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(typeof res.body).to.eql('object');
          expect(Array.isArray(res.body.data)).to.eql(true);
          done();
        });
    });

    it('should get a user', (done) => {
      request('localhost:3000')
        .get('/users/' + ada_id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.username).to.equal('Ada Byron');
          expect(res.body).to.have.property('_id');
          done();
        });
    });

    it('should update a user', (done) => {
      request('localhost:3000')
        .put('/users/' + ada_id)
        .send({name: 'Ada Lovelace'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a user', (done) => {
      request('localhost:3000')
      .del('/users/' + alan_id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('User removed');
        done();
      });
    });
  });

  describe('test token generation', () => {
    before((done) => {
      request('localhost:3000')
        .post('/signup')
        .send({
          name: 'Donald Knuth',
          email: 'taocp@cs.stanford.edu',
          password: 'grammar12'
        })
        .end(() => {
          done();
        });
    }); 
    it('should return a token on successful login', (done) => {
      request('localhost:3000')
        .get('/signin')
        .auth('taocp@cs.stanford.edu', 'grammar12')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.status).to.eql(200);
          expect(res.body).to.have.property('token');
          done();
        });
    });
  });
});
 
