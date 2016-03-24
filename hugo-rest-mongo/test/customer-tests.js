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
let Customer = require('./models-customers-model');

let userToken;

require('./server');

describe('testing customer-related routes', () => {
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
  })
})
