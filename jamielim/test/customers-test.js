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

let customerId;

describe('test /customers routes', () => {
  it('should respond to GET /customers', (done) => {
    request('localhost:3000')
      .get('/customers')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        let data = res.body.data
        data = data[data.length-1];
        expect(data).to.have.deep.property('firstName');
        expect(data).to.have.deep.property('lastName');
        expect(data).to.have.deep.property('gender');
        expect(data).to.have.deep.property('emailAddress');
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
        expect(res.body.firstName).to.equal('Jamie');
        expect(res.body.lastName).to.equal('Wilson');
        expect(res.body.gender).to.equal('female');
        expect(res.body.emailAddress).to.equal('jalynnlim@gmail.com');
        done();
      });
  });
});

describe('test /customers/:id routes', () => {
  before((done) => {
    request('localhost:3000')
      .post('/customers')
      .send(customerJSON)
      .end((err, res) => {
        customerId = res.body._id;
        done();
      });
  });

  it('should respond to GET /customers/:id', (done) => {
    request('localhost:3000')
      .get('/customers/' + customerId)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.firstName).to.equal('Jamie');
        expect(res.body.lastName).to.equal('Wilson');
        expect(res.body.gender).to.equal('female');
        expect(res.body.emailAddress).to.equal('jalynnlim@gmail.com');
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
        expect(res.body.firstName).to.equal('Jamie');
        // expect(res.body.lastName).to.equal('Lim');
        expect(res.body.gender).to.equal('female');
        expect(res.body.emailAddress).to.equal('jalynnlim@gmail.com');
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