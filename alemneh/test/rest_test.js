'use strict';


let mongoose = require('mongoose');
let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
let request = chai.request;
let expect = chai.expect;
require('../server');



describe('RESTful API', () => {
  describe('Student REST API', () => {
    before(function() {

    });

    it('should return an object', (done) => {
      request('localhost:3000')
      .get('/students')
      .end((err, res) => {
        if(err) throw err;
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
    });

    it('should be able to create a book', (done) => {
      request('localhost:3000')
      .post('/students/')
      .send({name:'mike', track:'html'})
      .end((err, res) => {
        if(err) throw err;
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
    });

    it('should be able to create a book', (done) => {
      request('localhost:3000')
      .post('/students/')
      .send({name:'mike', track:'html'})
      .end((err, res) => {
        if(err) throw err;
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
    });

  });

});
