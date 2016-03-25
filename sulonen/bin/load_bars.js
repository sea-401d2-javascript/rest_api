'use strict';

const chai = require('chai');
const chaihttp = require('chai-http');
chai.use(chaihttp);
const request = chai.request;
const expect = chai.expect;

process.env.MONGO_DB = 'mongodb://localhost/db';
require('./../server');

describe('REST API Bar Insertion', () => {

  describe('insert bars', () => {
    it('should create a new bar', (done) => {
      request('localhost:3000')
        .post('/bars')
        .send({
          name: 'Hatties Hat',
          neighborhood: 'Ballard',
          hours: '9am - 3am'
        })
        .end((err, res) => {
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

    it('should create another bar', (done) => {
      request('localhost:3000')
        .post('/bars')
        .send({
          name: 'Crocodile Lounge',
          neighborhood: 'Belltown',
          hours: '5pm - 3am'
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.name).to.equal('Crocodile Lounge');
          expect(res.body).to.have.property('_id');
          done();
        });
    });
  });
});
