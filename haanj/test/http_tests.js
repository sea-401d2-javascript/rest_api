'use strict';
require(__dirname + '/../index');

// var fs = require('fs');
let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
let request = chai.request;
let expect = chai.expect;

// let DB_PORT = require('../.config').DB_PORT;
let S_PORT = require('../.config').S_PORT;
// let mongoose = require('mongoose');

describe('/movies resource routing tests', function() {
  this.timeout(0); // due to latency with mongodb

  it('should send back array of movie objects with GET request', (done) => {
    request('localhost:' + S_PORT)
      .get('/movies')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(typeof res.body).to.eql('object');
        done();
      }); 
  });



  // it('should send back name of new file with POST request', (done) => {
  //   request('localhost:3000')
  //     .post('/users')
  //     .send({'name': 'boogers'})
  //     .end((err, res) => {
  //       expect(err).to.eql(null);
  //       expect(res).to.have.status(200);
  //       fs.readFile(__dirname + '/../data/' + res.text, 'utf8', function (err, data) {
  //         if (err) throw err;
  //         var obj = JSON.parse(data);
  //         expect(obj).to.eql({'name': 'boogers'});
  //         fs.readdir(__dirname + '/../data/', (err, files) => {
  //           expect(files.indexOf(res.text)).to.not.equal(-1); // checks that new file exists in directory
  //           done();
  //         });
  //       });
  //     });
  // });
});
