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
  it('should respond to GET /books', (done) => {
    request('localhost:3000')
      .get('/books')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        let data = res.body.data
        data = data[data.length-1];
        expect(data).to.have.deep.property('title');
        expect(data).to.have.deep.property('author');
        expect(data).to.have.deep.property('price');
        expect(data).to.have.deep.property('quantity');
        expect(data).to.have.deep.property('isAvailable');
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
        expect(res.body.title).to.equal('Eloquent JavaScript: A Modern Introduction to Programming');
        expect(res.body.author).to.equal('Marijn Haverbeke');
        expect(res.body.price).to.equal(39.95);
        expect(res.body.quantity).to.equal(3);
        expect(res.body.isAvailable).to.equal(true);
        done();
      });
  });
});

describe('test /books/:id routes', () => {
  before((done) => {
    request('localhost:3000')
      .post('/books')
      .send(bookJSON)
      .end((err, res) => {
        bookId = res.body._id;
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
        // expect(res.body.quantity).to.equal(2);
        expect(res.body.isAvailable).to.equal(true);
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
        // expect(res.body).to.have.deep.property('total');
        // expect(res.body.total).to.be.above(0);
        done();
      });
  });
});