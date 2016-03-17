'use strict';

const chai = require('chai');
const chai_http = require('chai-http');
chai.use(chai_http);
const request = chai.request;
const expect = chai.expect;

const express = require('express');
var app = express();

const parser = require('./../lib/parse-json.js');
app.use(parser);

describe('Middleware: parse-json', () => {

  before(() => {
    app.post('/', (req, res) => {
      res.send(req.body);
      res.end();
    });

    app.listen(3000, () => {
    // console.log('Server listening on port 3000');
    });
  });

  describe('Integration tests', () => {

    it('should return a JSON object', (done) => {
      var body = {
        id: 0,
        name: 'Chester Tester'
      };

      request('localhost:3000')
        .post('/')
        .send(body)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.name).to.equal('Chester Tester');
          done();
        });
    });

    it('should respond with an error on improper JSON', (done) => {
      request('localhost:3000')
        .post('/')
        .send('XXX')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Invalid JSON');
          done();
        });
    });
  });
});
