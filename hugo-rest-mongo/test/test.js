// var mocha = require('mocha');
// var chai = require('chai');
// var chaiHttp = require('chai-http');
// chai.use(chaiHttp);
// var expect = chai.expect;
// var request = chai.request;
// var http = require('http');
// require('../server.js');
// var Customer = require('../models/customers-model');
// var Product = require('../models/products-model');
//
// describe('testing routes for /customers resource', () => {
//   it('should hit a GET route for /customers', (done) => {
//     request('localhost:3000')
//     .get('/customers')
//     .end((err, res) => {
//       expect(err).to.equal(null);
//       expect(res).to.have.status(200);
//       expect(res).to.be.json;
//       expect(res.body).to.be.a('object');
//       done();
//     });
//   });
//   it('should hit a POST route for /customers', (done) => {
//     request('localhost:3000')
//     .post('/customers')
//     .send({"name":"testname", "age":"25", "email":"someemail@email.com"})
//     .end((err, res) => {
//       expect(err).to.equal(null);
//       expect(res).to.have.status(200);
//       expect(res).to.be.a('object');
//       expect(res.body).to.have.property('email');
//       done();
//     });
//   });
// });
//
// describe('testing routes for /customers/:id resource', () => {
//   it('should hit a GET route for /customers/:id', (done) => {
//     request('localhost:3000')
//     .get('/customers/56ead7f050679f3254d0113d')
//     .end((err, res) => {
//       expect(err).to.equal(null);
//       expect(res).to.have.status(200);
//       expect(res.text).to.include('name');
//       done();
//     });
//   });
//   it('should hit a PUT route for /customers/:id', (done) => {
//     request('localhost:3000')
//     .put('/customers/56ead7f050679f3254d0113d')
//     .send({"name":"testname", "age":"25", "email":"someemail@email.com"})
//     .end((err, res) => {
//       expect(err).to.equal(null);
//       expect(res).to.have.status(200);
//       expect(res).to.be.json;
//       expect(res.text).to.include('name');
//       expect(res.text).to.include('value');
//       done();
//     });
//   });
// });
//
// //product route testing
//
// describe('testing routes for /products resource', () => {
//   it('should hit a GET route for /products', (done) => {
//     request('localhost:3000')
//     .get('/products')
//     .end((err, res) => {
//       expect(err).to.equal(null);
//       expect(res).to.have.status(200);
//       expect(res).to.be.json;
//       expect(res.body).to.be.a('object');
//       done();
//     });
//   });
//   it('should hit a POST route for /products', (done) => {
//     request('localhost:3000')
//     .post('/products')
//     .send({"name":"broom", "upc":"25543534", "category":"Cleaning Products", "stock":"56"})
//     .end((err, res) => {
//       expect(err).to.equal(null);
//       expect(res).to.have.status(200);
//       expect(res).to.be.a('object');
//       expect(res.body).to.have.property('name');
//       // expect(res).to.have.property('SUCCESS');
//       done();
//     });
//   });
// });
//
// describe('testing routes for /products/:id resource', () => {
//   it('should hit a GET route for /products/:id', (done) => {
//     request('localhost:3000')
//     .get('/products/56eae9a71742c8ce5921a273')
//     .end((err, res) => {
//       expect(err).to.equal(null);
//       expect(res).to.have.status(200);
//       expect(res.text).to.include('apple');
//       done();
//     });
//   });
// });
//
// describe('testing PUT/DELETE routes for /customers', () => {
//   before((done) => {
//     var testCustomer = new Customer({name: 'Test Gordon', age: '26', email: 'sometestemail@gmail.com'});
//     testCustomer.save(function(err, data) {
//       if (err) throw err;
//
//       this.testCustomer = data;
//       done();
//     }.bind(this));
//   });
//   it('should create test customer entry', () => {
//     expect(this.testCustomer.name).to.equal('Test Gordon');
//     expect(this.testCustomer).to.have.property('_id');
//   });
//   it('should hit a PUT route for /customers/:id', (done) => {
//     var id = this.testCustomer._id;
//     request('localhost:3000')
//     .put('/customers/' + id)
//     .send({name: 'Not Gordon', age: '62', email: 'adifferentemail@em.com'})
//     .end((err, res) => {
//       expect(err).to.eql(null);
//       done();
//     });
//   });
//   it('should hit a DEL route for /customers/:id', (done) => {
//     request('localhost:3000')
//     .del('/customers/' + this.testCustomer._id)
//     .end((err, res) => {
//       expect(err).to.eql(null);
//       done();
//     });
//   });
// });
//
// //products/id routes
//
// describe('testing PUT/DELETE routes for /products/:id', () => {
//   before((done) => {
//     var testProduct = new Product({name: 'Test Banana', upc: '2dfdsa456', category: 'Produce', stock: '42'});
//     testProduct.save(function(err, data) {
//       if (err) throw err;
//
//       this.testProduct = data;
//       done();
//     }.bind(this));
//   });
//   it('should create test product entry', () => {
//     expect(this.testProduct.name).to.equal('Test Banana');
//     expect(this.testProduct).to.have.property('_id');
//   });
//   it('should hit a PUT route for /products/:id', (done) => {
//     var id = this.testProduct._id;
//     request('localhost:3000')
//     .put('/products/' + id)
//     .send({name: 'Not Banana', upc: '62dfads34234', category: 'Produce', stock: '24'})
//     .end((err, res) => {
//       expect(err).to.eql(null);
//       done();
//     });
//   });
//   it('should hit a DEL route for /products/:id', (done) => {
//     request('localhost:3000')
//     .del('/products/' + this.testProduct._id)
//     .end((err, res) => {
//       expect(err).to.eql(null);
//       done();
//     });
//   });
// });
