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

let bookId;

describe('test /books routes', () => {
  describe('GET /books/* routes', () => {
    beforeEach((done) => {
      request('localhost:3000')
        .post('/books')
        .send(bookJSON)
        .end((err, res) => {
          bookId = res.body._id;
          done();
        });
    });

    afterEach((done) => {
      request('localhost:3000')
        .delete('/books/' + bookId)
        .end((err, res) => {
          done();
        });
    });

    it('should respond to GET /books', (done) => {
      request('localhost:3000')
        .get('/books')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          let data = res.body.data;
          data = data[data.length-1];
          expect(data).to.have.property('title');
          expect(data.title).to.not.equal(null);
          expect(data).to.have.property('author');
          expect(data.author).to.not.equal(null);
          expect(data).to.have.property('price');
          expect(data.price).to.not.equal(null);
          expect(data).to.have.property('quantity');
          expect(data.quantity).to.not.equal(null);
          expect(data).to.have.property('isAvailable');
          expect(data.isAvailable).to.not.equal(null);
          done();
        });
    });

    it('should respond to GET /books/:id', (done) => {
      request('localhost:3000')
        .get('/books/' + bookId)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.title).to.equal('Eloquent JavaScript: A Modern Introduction to Programming');
          expect(res.body.author).to.equal('Marijn Haverbeke');
          expect(res.body.price).to.equal(39.95);
          expect(res.body.quantity).to.equal(3);
          expect(res.body.isAvailable).to.equal(true);
          done();
        });
    });

    it('should respond to GET /books/totalQuantity', (done) => {
      request('localhost:3000')
        .get('/books/totalQuantity')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body[0]).to.have.deep.property('total');
          expect(res.body[0].total).to.be.above(0);
          done();
        });
    });
  });

  describe('POST /books routes', () => {
    afterEach((done) => {
      request('localhost:3000')
        .delete('/books/' + bookId)
        .end((err, res) => {
          done();
        });
    });

    it('should respond to POST /books', (done) => {
      request('localhost:3000')
        .post('/books')
        .send(bookJSON)
        .end((err, res) => {
          bookId = res.body._id;
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.title).to.equal('Eloquent JavaScript: A Modern Introduction to Programming');
          expect(res.body.author).to.equal('Marijn Haverbeke');
          expect(res.body.price).to.equal(39.95);
          expect(res.body.quantity).to.equal(3);
          expect(res.body.isAvailable).to.equal(true);
          done();
        });
    });
  });

  describe('PUT /books/:id routes', () => {
    before((done) => {
      request('localhost:3000')
        .post('/books')
        .send(bookJSON)
        .end((err, res) => {
          bookId = res.body._id;
          done();
        });
    });

    after((done) => {
      request('localhost:3000')
        .delete('/books/' + bookId)
        .end((err, res) => {
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
          expect(res.body.title).to.equal('Eloquent JavaScript: A Modern Introduction to Programming');
          expect(res.body.author).to.equal('Marijn Haverbeke');
          expect(res.body.price).to.equal(39.95);
          expect(res.body.quantity).to.equal(2);
          expect(res.body.isAvailable).to.equal(true);
          done();
        });
    });
  });

  describe('DELETE /books/:id routes', () => {
    before((done) => {
      request('localhost:3000')
        .post('/books')
        .send(bookJSON)
        .end((err, res) => {
          bookId = res.body._id;
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
          expect(res.body.message).to.be.equal('Removed Book');
          done();
        });
    });
  });
});