'use strict';
process.env.MONGOLAB_URI = 'mongodb://localhost/arcade-test';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server');
require('../models/arcades');

describe('testing Arcade REST api routes', () => {

  after((done)=>{
    mongoose.connection.db.dropDatabase(function(){
      done();
    });
  });
  it('POST should post new data to /Arcades', (done)=>{
    request('localhost:3000')
    .post('/api/arcades')
    .send({name: 'test arcade'})
    .end((err, res) =>{
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.data['name']).to.have.eql('test arcade');
      expect(res.body.data).to.have.property('_id');
      done();
    });
  });
  it('GET should receive the /arcades data', (done)=>{
    request('localhost:3000')
    .get('/api/arcades')
    .end((err, res)=> {
      expect(err).to.eql(null);
      expect(res).to.be.status(200);
      expect(res).to.be.json;
      console.log(res.body);
      expect(res.body).to.exist;
      expect(Array.isArray(res.body)).to.eql(true);
      done();

    });
  });
});
describe('needs an array to get id', () =>{
  // beforeEach((done)=>{
  //   var testArcade = new Arcade({name: 'test arcade'});
  //   testArcade.save((err, data)=>{
  //     if (err) throw err;
  //     this.testArcade = data;
  //     done();
  //   }).bind(this);
  // });
  // it('should be able to make a note in a beforeEach block', ()=>{
  //   expect(this.testArcade.name).to.eql('test arcade');
  //   expect(this.testArcade).to.have.property('_id');
  // });
  it('GET should receive the /arcades/:id data', (done)=>{
    var id = this.testArcade.id;
    request('localhost:3000')
    .get('/api/arcades/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.be.status(200);
      console.log(res.body._id);
      expect(res.body).to.exist;
      done();
    });
  });

  it('PUT should receive the /arcades/:id data', (done)=>{
    var id = this.testArcade._id;
    request('localhost:3000')
    .put('/api/arcades' + id)
    .send({name: 'here is an updated arcade'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.be.status(200);
      expect(res.body.msg).to.eql('success');
      done();
    });

  });
});

// });
