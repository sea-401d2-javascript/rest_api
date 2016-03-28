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
let Customer = require('../models/customers-model')
let Product = require('../models/products-model');

process.env.MONGOLAB_URI = 'mongodb://localhost/testdb';


let productUserToken;

require('../server');

describe('testing product creation using access token', () => {
  it('should create a new Customer entry', (done) => {
    request('localhost:3000')
    .post('/createaccount')
    .send({"name":"productuser", "age":"23", "email":"123json@gmail.com", "password":"password123"})
    .end((err, res) => {
      expect(err).to.equal(null);
      done();
    });
  });
  it('should find the user previously created and respond with token', (done) => {
    request('localhost:3000')
    .post('/login')
    .auth('productuser:password123')
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res.body).to.have.property('token');
      productUserToken = res.body.token;
      done();
    });
  });
  it('should return successfully when querying for a product', (done) => {
    request('localhost:3000')
    .get('/products')
    .set('Authorization', 'token' + productUserToken)
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res.status).to.equal(200);
      expect(res).to.be.a('object');
      done();
    });
  });
  it('should create a product using generated token', (done) => {
    request('localhost:3000')
    .post('/products')
    .set('Authorization', 'token' + productUserToken)
    .send({"name":"umbrella", "upc":"343464536", "category":"seasonal", "stock":"45"})
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('umbrella');
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('_id');
      done();
    });
  });
});

describe('testing product PUT and DEL using token', () => {
  let id;
  beforeEach((done) => {
    let productTest = new Product({name: "test umbrella"});
    productTest.save((err, data) => {
      id = data._id;
    });
    done();
  });
  it('should make an update to test product', (done) => {
    request('localhost:3000')
    .put('/products/' + id)
    .set('Authorization', 'token' + productUserToken)
    .send({"title":"replace umbrella"})
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res).to.be.a('object');
      done();
    });
  });
  it('should delete test product', (done) => {
    request('localhost:3000')
    .delete('/products/' + id)
    .set('Authorization', 'token' + productUserToken)
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res.status).to.equal(200);
      expect(res).to.be.a('object');
      done();
    });
  });
});

after((done) => {
  mongoose.connection.db.dropDatabase(() => {
    done();
  });
});
