'use strict';
process.env.MONGOLAB_URI = 'mongodb://localhost/game-test';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server');

require('../models/games');

describe('testing Game REST api routes', () => {
  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });
  it('POST should post new data to /games', (done)=>{
    request('localhost:3000')
      .post('/api/games')
      .send({title: 'this is a test'})
      .end((err, res) =>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.title).to.eql('this is a test');
        done();
      });
  });
  it('GET should receive the /games data', (done)=>{
    request('localhost:3000')
      .get('/api/games')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.be.status(200);
        console.log(res.body);
        expect(res.body).to.exist;
        done();

      });
  });
});
