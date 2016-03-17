var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var request = chai.request;
var http = require('http');
require('../server.js');

describe('testing routes for /customers resource', () => {
  it('should hit a GET route for /customers', (done) => {
    request('localhost:3000')
    .get('/customers')
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      done();
    });
  });
  it('should hit a POST route for /customers', (done) => {
    request('localhost:3000')
    .post('/customers')
    .send({"name":"test", "age":"25", "email":"someemail@email.com"})
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body.SUCCESS).to.have.property('email');
      expect(res.body).to.have.property('SUCCESS')
      done();
    });
  });
});

describe('testing routes for /customers/:id resource', () => {
  it('should hit a GET route for /customers/:id', (done) => {
    request('localhost:3000')
    .get('/customers/banana') //revise
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.text).to.include('banana'); //revise
      expect(res.body).to.have.property('SUCCESS')
      done();
    });
  });
  it('should hit a PUT route for /customers/:id', (done) => {
    request('localhost:3000')
    .put('customers/banana') //revise
    .send({""}) //revise
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res)to.be.json;
      expect(res.body).to.have.property('UPDATED');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('email');
    });
  });
  it('should hit a DEL route for /customers/:id', (done) => {
    request('localhost:3000')
    .get('/customers/banana') //revise
    .delete('/customers/banana') //revise
    .end((err, res) => {
      expect(err).to.be(null);
      expect(res)to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.property('REMOVED');
      expect(res.body.REMOVED).to.have.property('name');
      done();
    });
  });
});

//product route testing

describe('testing routes for /products resource', () => {
  it('should hit a GET route for /products', (done) => {
    request('localhost:3000')
    .get('/products')
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.a('array');
      done();
    });
  });
  it('should hit a POST route for /products', (done) => {
    request('localhost:3000')
    .post('/products')
    .send({"name":"test", "age":"25", "email":"someemail@email.com"})
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res).to.be.a('object');
      expect(res.body.SUCCESS).to.have.property('name');
      expect(res.body).to.have.property('SUCCESS')
      done();
    });
  });
});

describe('testing routes for /products/:id resource', () => {
  it('should hit a GET route for /products/:id', (done) => {
    request('localhost:3000')
    .get('/products/banana') //revise
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res.text).to.include('banana'); //revise
      expect(res.body).to.have.property('SUCCESS')
      done();
    });
  });
  it('should hit a PUT route for /products/:id', (done) => {
    request('localhost:3000')
    .put('products/banana') //revise
    .send({""}) //revise
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res).to.have.status(200);
      expect(res)to.be.json;
      expect(res.body).to.have.property('UPDATED');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('upc');
    });
  });
  it('should hit a DEL route for /products/:id', (done) => {
    request('localhost:3000')
    .get('/products/banana') //revise
    .delete('/products/banana') //revise
    .end((err, res) => {
      expect(err).to.be(null);
      expect(res)to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.property('REMOVED');
      expect(res.body.REMOVED).to.have.property('name');
      done();
    });
  });
});
