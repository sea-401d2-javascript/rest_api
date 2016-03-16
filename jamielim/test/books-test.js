'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
require(__dirname + '/../server.js');

chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;

let bookJSON = {
  title: 'Eloquent JavaScript: A Modern Introduction to Programming',
  author: 'Marijn Haverbeke',
  price: 39.95,
  quantity: 3,
  isAvailable: true
};

let updateJSON = {
  quantity: 2
};

let bookId = '56e9939087dac0b42face839';

describe('test /books routes', () => {
  it('should respond to GET /books', (done) => {
    request('localhost:3000')
      .get('/books')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should respond to POST /books', (done) => {
    request('localhost:3000')
      .post('/books')
      .send(bookJSON)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe('test /books/:id routes', () => {
  it('should respond to GET /books/:id', (done) => {
    request('localhost:3000')
      .get('/books/' + bookId)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should respond to PUT /books/:id', (done) => {
    request('localhost:3000')
      .put('/books/' + bookId)
      .send(updateJSON)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });


  it('should respond to DELETE /books/:id', (done) => {
    request('localhost:3000')
      .delete('/books/' + bookId)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe('test /books/totalQuantity routes', () => {
  it('should respond to GET /books/totalQuantity', (done) => {
    request('localhost:3000')
      .get('/books/totalQuantity')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});