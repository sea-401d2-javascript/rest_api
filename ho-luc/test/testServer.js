'use strict'
let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
let request = chai.request;
let expect = chai.expect;
var mongoose = require('mongoose');
var Animal = require(__dirname + './../models/animals_model');
let People = require(__dirname + '/../models/people_model');
require(__dirname + '/../server');
var testId;

describe('Test /animals route', () => {
  it('expect res on POST, to be equal to dumbo, peanuts, 50, with status 200 ', (done) => {
    request('localhost:3000')
      .post('/animals')
      .send('{"name":"dumbo","favoriteFood":"peanuts","age":50}')
      .end((err, res) => {
        testId = res.body.data['_id'];
        expect(err).to.eql(null);
        expect(res.body.status).to.be.eql(200);
        expect(res.body.data['name']).to.eql('dumbo');
        expect(res.body.data['favoriteFood']).to.eql('peanuts');
        expect(res.body.data['age']).to.eql(50);
        expect(res).to.be.json
        expect(res.body.data).to.have.a.property('_id')
        done();
      })
  })

  it('expect GET to have status 200, with content-type json', (done) => {
    request('localhost:3000')
      .get('/animals')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.be.json
        expect(res.body.status).to.be.eql(200);
        expect(res.header['content-type']).to.eql('application/json; charset=utf-8');
        done();
      })
  })

  after((done) => {
    testId = null;
    mongoose.connection.db.dropDatabase(() => {
      done();
    })
  })
})

describe('Testing /animals/\':id\' specific route', () => {
  beforeEach((done) => {
    var newAnimal = new Animal({"name":"ducky", "favoriteFood":"candy", "age":2});
    newAnimal.save((err, animal) => {
      testId = animal._id;
      this.newAnimal = animal
      done();
    })
  })

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    })
  })

  it('expect response, to specific ID (with name: ducky, favoriteFood: candy, age: 2)', (done) => {
    request('localhost:3000')
      .get('/animals/' + testId)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.status).to.eql(200);
        expect(res.body.data['name']).to.eql('ducky');
        expect(res.body.data['favoriteFood']).to.eql('candy');
        expect(res.body.data['age']).to.eql(2);
        expect(res).to.be.json;
        expect(res.body.data).to.have.a.property('_id');
        done();
      })
  })

  it('expect PUT,to override previous ID with the name: duck, favoriteFood: bread, age: 500, and with status 200', (done) => {
    request('localhost:3000')
      .put('/animals/' + testId)
      .send('{"name":"duck","favoriteFood":"bread","age":500}')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.status).to.eql(200);
        expect(res.body.data['name']).to.eql('duck');
        expect(res.body.data['favoriteFood']).to.eql('bread');
        expect(res.body.data['age']).to.eql(500);
        expect(res).to.be.json;
        done();
      })
  })

  it('expect DELETE to have status 200, with a message \'animal removed\'', (done) => {
    request('localhost:3000')
      .delete('/animals/' + testId)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body['message']).to.eql('animal removed');
        expect(res).to.be.json;
        done();
      })
  })

  before((done) => {
    var newAnimal = new Animal({"name":"shark", "favoriteFood":"fish", "age":22});
    newAnimal.save((err, animal) => {
      this.newAnimal = animal
    })
    var newAnimal = new Animal({"name":"killer-whale", "favoriteFood":"fish", "age":20});
    newAnimal.save((err, animal) => {
      this.newAnimal = animal
      done();
    })
  })

  it('expect non-crud route to find most popular food fish, with a count of 2.', (done) => {
    request('localhost:3000')
      .get('/mostPopularAnimalFood')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body['message']).to.eql('The most popular food for animals is, \'fish\' with 2 tallies');
        done();
      })
  })
})

//<---tests people--->
describe('Test /people route', () => {
  it('expect POST to equal name: jason, favoriteFood: beer, and age: 13, with a status code 200', (done) => {
    request('localhost:3000')
    .post('/people')
    .send('{"name":"jason","favoriteFood":"beer","age":10}')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.status).to.be.eql(200);
      expect(res).to.be.json;
      expect(res.body.data['name']).to.eql('jason');
      expect(res.body.data['favoriteFood']).to.eql('beer');
      expect(res.body.data['age']).to.eql(10);
      done();
    })
  })

  it('expect GET to status 200, with content-type json', (done) => {
    request('localhost:3000')
    .get('/people')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.status).to.be.eql(200);
      expect(res).to.be.json;
      expect(res.header['content-type']).to.eql('application/json; charset=utf-8');
      done();
    })
  })

  after((done) => {
    testId = null;
    mongoose.connection.db.dropDatabase(() => {
      done();
    })
  })
})

describe('Testing /people/\':id\' at a specifc route', () => {
  beforeEach((done) => {
    var newPeople = new People({"name":"monGruse", "favoriteFood":"pizza", "age":27});
    newPeople.save((err, person) => {
      testId = person._id;
      this.newPeople = person
      done();
    })
  })
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    })
  })


  it('expect GET response to equal, name: monGruse, favoriteFood: pizza, age: 27', (done) => {
    request('localhost:3000')
      .get('/people/' + testId)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.status).to.eql(200);
        expect(res.body.data['name']).to.eql('monGruse');
        expect(res.body.data['favoriteFood']).to.eql('pizza');
        expect(res.body.data['age']).to.eql(27);
        expect(res).to.be.json;
        expect(res.body.data).to.have.a.property('_id');
        done();
      })
  })

  it('expect PUT to override previous ID with the name: Mario, favoriteFood: awesomesauce, age: 40, and with status 200', (done) => {
    request('localhost:3000')
      .put('/animals/' + testId)
      .send('{"name":"Mario","favoriteFood":"awesomesauce","age":40}')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.status).to.eql(200);
        expect(res.body.data['name']).to.eql('Mario');
        expect(res.body.data['favoriteFood']).to.eql('awesomesauce');
        expect(res.body.data['age']).to.eql(40);
        expect(res).to.be.json;
        done();
      })
  })

  it('expect DELETE to have status 200 with message \'person removed\' ', (done) => {
    request('localhost:3000')
      .delete('/people/' + testId)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body['message']).to.eql('person removed');
        expect(res).to.be.json;
        done();
      })
  })

  before((done) => {
    var newPeople = new People({"name":"sam", "favoriteFood":"chips", "age":14});
    newPeople.save((err, person) => {
      this.newPeople = person;
    })
    var newPeople = new People({"name":"luc", "favoriteFood":"chips", "age":5});
    newPeople.save((err, person) => {
      this.newPeople = person;
      done();
    })
  })

  it('expect non-crud route to find most popular food pizza with a count of 3.', (done) => {
    request('localhost:3000')
      .get('/mostPopularPeopleFood')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        expect(res.body['message']).to.eql('The most popular food for people is, \'pizza\' with 3 tallies');
        done();
      })
  })
})
