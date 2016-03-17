'use strict';
// var mongoose = require('mongoose');
// var resources = require(__dirname + '/../lib/resources.js');
var Character = require(__dirname + '/../models/characters-model.js');
var Event = require(__dirname + '/../models/events-model.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = chai.request;
var expect = chai.expect;

require(__dirname + '/../server.js');

describe('integration tests', () => {
  var ringLost = {
    name: 'Isildur loses the ring', 
    date: {
      day: 4,
      month: 10,
      year: 2,
      age: 'TA'
    },
    category: ['Battle', 'Ring event'],
    location: 'Gladden fields'
  };
  var gollumFindsRing = {
    name: 'Smeagol takes the ring from Deagol', 
    date: {
      year: 2463,
      age: 'TA'
    },
    category: ['Turning point', 'Ring event'],
    location: 'Gladden fields'
  };
  var gimli = {
    name: 'Gimli',
    race: 'Dwarf',
    age: 139
  };
  var legolas = {
    name: 'Legolas', 
    race: 'Elf', 
    age: 2931
  };
  var gimliID, ringLostID;
  describe('server.js and routes', () => {
    describe('/events route', () => {
      it('should let you post event', (done) => { //will fail if mongo not running
        request('localhost:3000').post('/events').send(ringLost)
        .end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          done();
        });
      });
      
      it('should let you read all events', (done) => { //will fail if mongo not commanded to 'use db'
        request('localhost:3000').get('/events').end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          var DBRingLost = response.body.filter((current) => {
            return current.name === 'Isildur loses the ring';
          })[0];
          ringLostID = DBRingLost._id;
          expect(DBRingLost.date).to.eql(ringLost.date);
          done();
        });
      });
      
      it('should let you read events by id', (done) => {
        request('localhost:3000').get('/events/' + ringLostID).end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          expect(response.body.date).to.eql(ringLost.date);
          done();
        });
      });
      
      it('should let you update events by id', (done) => {
        ringLost.category.push('Turning point'); 
        request('localhost:3000').put('/events/' + ringLostID).send(ringLost).end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          // console.log('PUT response body: ', response.body);
          expect(response.body.category.indexOf('Turning point')).to.not.equal(-1);
          done();
        });
      });
      
      it('should let you delete events by id', (done) => {
        request('localhost:3000').post('/events').send(gollumFindsRing).end((err, response) => {
          expect(err).to.equal(null);
          expect(response.body.name).to.equal('Smeagol takes the ring from Deagol');
          var newId = response.body._id;
          request('localhost:3000').delete('/events/' + newId).end((err, response) => {
            expect(err).to.equal(null);
            expect(response.status).to.equal(200);
            Event.find({_id: newId}, (err, DBGollumFindsRing) => {
              // console.log('DBGollumFindsRing after delete is');
              // console.dir(DBGollumFindsRing);
              expect(DBGollumFindsRing.length).to.equal(0);
              done();
            });
          });
        });
      });
    });
    
    
    describe('/characters route', () => {
      it('should let you post characters', (done) => { //will fail if mongo not running
        request('localhost:3000').post('/characters').send(gimli)
        .end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          done();
        });
      });
      
      it('should let you read all characters', (done) => { //will fail if mongo not commanded to 'use db'
        request('localhost:3000').get('/characters').end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          // console.log('response.body is');
          // console.dir(response.body);
          var DBGimli = response.body.filter((current) => {
            return current.name ==='Gimli';
          })[0]; //this is a little clutzy -- basically, because there may already be many gimlis in the database, i'm just finding one, may fix once all other tests working so gimli is added and then removed over the course of the test
          gimliID = DBGimli._id;
          expect(DBGimli).to.have.property('age');
          expect(DBGimli.kia).to.equal(false);
          done();
        });
      });
      
      it('should let you read one by id', (done) => {
        request('localhost:3000').get('/characters/' + gimliID).end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          expect(response.body.kia).to.equal(false);
          console.log(response.body);
          done();
        });
      });
      
      it('should let you update one by id', (done) => {
        gimli.age = 140;
        request('localhost:3000').put('/characters/' + gimliID).send(gimli).end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          // console.log('PUT response body: ', response.body);
          expect(response.body.age).to.equal(140);
          expect(response.body.kia).to.equal(false);
          done();
        });
      });
      
      it('should let you delete one by id', (done) => {
        request('localhost:3000').post('/characters').send(legolas).end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          // console.log(response.body);
          expect(response.body.name).to.equal('Legolas');
          var newId = response.body._id;
          // console.log('newId is', newId);
          request('localhost:3000').delete('/characters/' + newId).end((err, response) => {
            expect(err).to.equal(null);
            expect(response.status).to.equal(200);
            Character.find({_id: newId}, (err, DBLegolas) => {
              // console.log('DBLegolas after delete is');
              // console.log(DBLegolas);
              expect(DBLegolas.length).to.equal(0);
              done();
            });
          });
        });
      });
    });
  });  
});
