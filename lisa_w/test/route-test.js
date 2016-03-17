'use strict';
var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);

var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server');

describe('testing REST api routes', () => {

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
      expect(res.body.name).to.eql('test note');
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
});
describe('look for an existing arcade',(done)=>{
  beforeEach(function(done) {
    var testArcade = new Arcade({name: 'test arcade'});
    testArcade.save(function(err, data){
      if (err) throw err;
      this.testArcade = data;
      done();
    }.bind(this));
  })
  it('GET should receive the /arcades/:id data', (done)=>{
    request('localhost:3000')
    .get('/api/arcades/:id')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body).should.be.json;
      expect(res).to.be.status(200);
      console.log(res.body._id);
      expect(res.body).to.exist;
      // expect(res.body._id).to.eql(res.id);
      done();
    });
  });
  // });
  it('PUT should receive the /arcades/:id data', (done)=>{
    var id = this.
    request('localhost:3000')
    .put('/api/arcades/' + id)
    // .get('/api/arcades')
    .end(function(err, res) {
      request('localhost:3000')
      .put('/api/arcades/' + res.body[0]._id)
      .send({'name': 'Test Arcade'})
      .end((err, res)=> {
        expect(err).to.eql(null);
        expect(res).to.be.status(200);
        expect(res).to.be.json;
        console.log(res.body);
        expect(res.body).to.exist;
        expect(Array.isArray(res.params.id)).to.be.true;
        done();
      });

    });
  });
  it('POST should post new data to /games', (done)=>{
    request('localhost:3000')
      .post('/api/games')
      .send({})
      .end((err, res) =>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
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
});
