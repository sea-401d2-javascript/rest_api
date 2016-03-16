'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
require(__dirname + '/../server.js');

chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;

let customerJSON = {
  firstName: 'Jamie',
  lastName: 'Wilson',
  gender: 'female',
  emailAddress: 'jalynnlim@gmail.com'
};

let updateJSON = {
  lastName: 'Lim'
};

let customerId = '56e99a79960e67fa3153e4c0';

describe('test /customers routes', () => {
  it('should respond to GET /customers', (done) => {
    request('localhost:3000')
      .get('/customers')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should respond to POST /customers', (done) => {
    request('localhost:3000')
      .post('/customers')
      .send(customerJSON)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe('test /customers/:id routes', () => {
  it('should respond to GET /customers/:id', (done) => {
    request('localhost:3000')
      .get('/customers/' + customerId)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should respond to PUT /customers/:id', (done) => {
    request('localhost:3000')
      .put('/customers/' + customerId)
      .send(updateJSON)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });


  it('should respond to DELETE /customers/:id', (done) => {
    request('localhost:3000')
      .delete('/customers/' + customerId)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});