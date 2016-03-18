'use strict';
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server');

describe('testing Arcade REST api routes', () => {

  // after(function(done){
  //   mongoose.connection
  // })
  it('POST should post new data to /Arcades', (done)=>{
    request('localhost:3000')
    .post('/api/arcades')
    .send({name: 'test name'})
    .end((err, res) =>{
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('test name');
      expect(res.body).to.have.property('_id');
      done();
    });
  });
  it('GET should receive the /arcades data', (done)=>{
    request('localhost:3000')
    .get('/api/arcades')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.be.status(200);
      console.log(res.body);
      expect(res.body).to.exist;
      done();

    });
  });
  it('GET should receive the /arcades/:id data', (done)=>{
    request('localhost:3000')
    .get('/api/arcades/:id')
    .end(function(err, res) {
      expect(err).to.eql(null);
      // expect(res.body).should.be.json;
      expect(res).to.be.status(200);
      console.log(res.body._id);
      expect(res.body).to.exist;
      expect(res.body).to.have.property('id');
      // expect(res.body._id).to.eql(res.id);
      done();
    });
  });

  it('PUT should receive the /arcades/:id data', (done)=>{
    request('localhost:3000')
    .get('/api/arcades')
    .end(function(err, res) {
      request('localhost:3000')
      .put('/api/arcades/' + res.body[0]._id)
      .send({'name': 'Test Arcade'})
      .end((err, res)=> {
        expect(err).to.eql(null);
        expect(res).to.be.status(200);
        // expect(res).to.be.json;
        console.log(res.body);
        expect(res.body).to.exist;
        expect(Array.isArray(res.params.id)).to.a(true);
        done();
      });

    });
  });

});
