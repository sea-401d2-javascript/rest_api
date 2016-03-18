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
  var riddlesInTheDark = {
    name: 'Riddles in the dark', 
    date: {
      month: 7,
      year: 2941,
      age: 'TA'
    },
    charsPresent: ['56eaf275f294d4f4d5d13fe1', '56eaf240f294d4f4d5d13fdd'],
    category: ['Ring event'],
    location: 'Gollums Lake'
  };

  var gimli = {
    name: 'Gimli',
    race: 'Dwarf',
    age: 139,
    presentAt: ['56eaf2fbf294d4f4d5d13fe5']
  };

  var gimliID, riddlesInTheDarkID;
  describe('server.js and routes', () => {
    describe('/events route', () => {
      
      it('should let you post an event', (done) => { //will fail if mongo not running
        request('localhost:3000').post('/events').send(riddlesInTheDark)
        .end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          riddlesInTheDarkID = response.body._id;
          done();
        });
      });
      
      it('should let you get all events', (done) => { //will fail if mongo not commanded to 'use db'
        request('localhost:3000').get('/events').end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          console.dir(response.body);
          response.body.forEach((current) => {
            console.log(current.name);
            console.log(current.name === 'Riddles in the dark');
          });
          var DBriddlesInTheDark = response.body.filter((current) => {
            return current.name === 'Riddles in the dark';
          })[0];
          // console.log('DBriddlesInTheDark is');
          // console.log(DBriddlesInTheDark);
          expect(DBriddlesInTheDark.charsPresent.filter((current) => {
            return current.name === 'Gollum';
          })[0].race).to.equal('Hobbit');//successfully populated 
          expect(DBriddlesInTheDark.date).to.eql(riddlesInTheDark.date);
          done();
        });
      });
      
      it('should let you get events by id', (done) => {
        request('localhost:3000').get('/events/' + riddlesInTheDarkID).end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          // console.log('response.body in GET /events/:id');
          // console.log(response.body);
          expect(response.body[0].charsPresent.filter((current) => {
            return current.name === 'Gollum';
          })[0].race).to.equal('Hobbit'); //successfully populated
          expect(response.body[0].date).to.eql(riddlesInTheDark.date);
          done();
        });
      });
      
      it('should let you update events by id', (done) => {
        riddlesInTheDark.category.push('Turning point'); 
        request('localhost:3000').put('/events/' + riddlesInTheDarkID).send(riddlesInTheDark).end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          // console.log('PUT response body: ', response.body);
          // expect(response.body.charsPresent.filter((current) => current.name === 'Gollum')[0]).to.have.property('race'); //not populating on PUT response
          expect(response.body.category.indexOf('Turning point')).to.not.equal(-1);
          done();
        });
      });
      
      it('should let you delete events by id', (done) => {
        request('localhost:3000').delete('/events/' + riddlesInTheDarkID).end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          Event.find({_id: riddlesInTheDarkID}, (err, DBriddlesInTheDark) => {
            expect(DBriddlesInTheDark.length).to.equal(0);
            done();
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
          gimliID = response.body._id;
          done();
        });
      });
      
      it('should let you read all characters', (done) => { //will fail if mongo not commanded to 'use db'
        request('localhost:3000').get('/characters').end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          console.log('response.body is');
          console.dir(response.body);
          var DBGimli = response.body.filter((current) => {
            return current.name ==='Gimli';
          })[0];
          expect(DBGimli).to.have.property('age');
          expect(DBGimli.kia).to.equal(false);
          done();
        });
      });
      
      it('should let you read one by id', (done) => {
        request('localhost:3000').get('/characters/' + gimliID).end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          expect(response.body[0].kia).to.equal(false);
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
        request('localhost:3000').delete('/characters/' + gimliID).end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          Character.find({_id: gimliID}, (err, DBGimli) => {
            expect(DBGimli.length).to.equal(0);
            done();
          });
        });
      });
    });
    describe('/states route', () => {
      it('should return the number of characters and events', (done) => {
        request('localhost:3000').get('/stats').end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          expect(response.body.totalCharacters).to.be.above(1);
          expect(response.body.totalEvents).to.be.above(1);
          done();
        });
      });
    });
  });  
});
