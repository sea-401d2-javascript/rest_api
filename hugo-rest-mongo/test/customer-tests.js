'use strict';

let mocha = require('mocha');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);

let request = chai.request;
let expect = chai.expect;
let url = require('url');
let fs = require('fs');
let mongoose = require('mongoose');
let Customer = require('../models/customers-model');

let userToken;

require('../server');

describe('testing customer-related GET and POST routes', () => {
  it('should make a new user with given credentials', (done) => {
    request('localhost:3000')
    .post('/createaccount')
    .send('{"name":"login user", "age":"23", "email":"123json@gmail.com", "password":"password123"}')
    .end((err, res) => {
      expect(err).to.equal(null);
      done();
    });
  });
  it('should find created user and return a shiny Token', (done) => {
    request('localhost:3000')
    .post('/login')
    .auth('login user:password123')
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res.body).to.have.property('token');
      userToken = res.body.token;
      done();
    });
  });
  it('should hit customers GET route and return json with info', (done) => {
    request('localhost:3000')
    .get('/customers')
    .set('Authorization', 'token' + userToken)
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res.status).to.equal(200);
      expect(res).to.be.a('object');
      done();
    });
  });
});

describe('testing customer-related PUT and DEL routes', () => {
  let id;
  beforeEach((done) => {
    let testCustomer = new Customer({name: 'test smith', age: 25, email: '123@gmail.com', password:'testpassword'});
    testCustomer.save((err, data) => {
      id = data._id;
      done();
    });
  });
  it('should update an existing customer', (done) => {
    request('localhost:3000')
    .put('/customers/' + id)
    .set('Authorization', 'token' + userToken)
    .send('{"name":"another name"}')
    .end((err, res) => {
      expect(err).to.be(null);
      expect(res.status).to.equal(200);
      expect(res).to.be.a('object');
      done();
    });
  });
  it('should delete created customer', (done) => {
    request('localhost:3000')
    .delete('/customers' + id)
    .set('Autorization', 'token' + userToken)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    });
  });

})
