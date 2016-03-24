'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var request = chai.request;

var Beers = require(__dirname + '/../models/beer_model.js');
var Drinks = require(__dirname + '/../models/drink_model.js');
var User = require(__dirname + '/../models/user_model.js');

process.env.MONGOLAB_URI = 'mongodb://localhost/testdb';

require(__dirname + '/../server');

describe('beers REST api', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a new beer', function(done) {
    request('localhost:3000')
      .post('/beers')
      .send({name: 'great beer'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('great beer');
        expect(res.body).to.have.property('name');
        done();
      });
  });

  it('should get all beers in db', function(done) {
    request('localhost:3000')
    .get('/beers')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body).to.eql('object');
      done();
    });
  });

  describe('needs a beer to work with', function() {
    beforeEach(function(done) {
      var testBeer = new Beers({name: 'test beer'});
      testBeer.save(function(err, data) {
        if(err) throw err;

        this.testBeer = data;
        done();
      }.bind(this));
    });

    it('should be able to make a beer in a beforeEach block', function() {
      expect(this.testBeer.name).to.eql('test beer');
      expect(this.testBeer).to.have.property('name');
    });

    it('should update a beer record', function(done) {
      var id = this.testBeer._id;
      request('localhost:3000')
      .put('/beers/' + id)
      .send('{"name": "new beer name"}')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('name');
        done();
      });
    });

    it('should be able to delete a beer', function(done) {
      var id = this.testBeer._id;
      request('localhost:3000')
        .delete('/beers/' + id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.eql({message: 'beer removed'});
          done();
        });
    });
  });
});
describe('Drinks REST api', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      console.log('server disconnected');
      done();
    });
  });

  it('should be able to create a new drink', function(done) {
    request('localhost:3000')
      .post('/drinks')
      .send({name: 'Lemon Drop'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Lemon Drop');
        expect(res.body).to.have.property('name');
        done();
      });
  });

  it('should get all drinks in db', function(done) {
    request('localhost:3000')
    .get('/drinks')
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body).to.eql('object');
      done();
    });
  });

  describe('needs a drink to work with', function() {
    beforeEach(function(done) {
      var testDrink = new Drinks({name: 'test drink', alcohol:['gin']});
      testDrink.save(function(err, data) {
        if(err) throw err;
        this.testDrink = data;
        done();
      }.bind(this));
    });

    it('should be able to make a drink in a beforeEach block', function() {
      expect(this.testDrink.name).to.eql('test drink');
      expect(this.testDrink).to.have.property('name');
      expect(this.testDrink).to.have.property('alcohol');
    });

    it('should get all drinks made with a user chosen alcohol', function(done) {
      request('localhost:3000')
      .get('/search/?alcohol="gin"')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        done();
      });
    });

    it('should update a drink record', function(done) {
      var id = this.testDrink._id;
      request('localhost:3000')
      .put('/drinks/' + id)
      .send('{"name": "new drink name"}')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('name');
        done();
      });
    });

    it('should be able to delete a drink', function(done) {
      var id = this.testDrink._id;
      request('localhost:3000')
        .delete('/drinks/' + id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.eql({message: 'drink removed'});
          done();
        });
    });
  });
});
