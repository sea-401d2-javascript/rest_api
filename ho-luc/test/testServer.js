'use strict'
let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
let request = chai.request;
let expect = chai.expect;
// var mongoose = require('mongoose');
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
})

describe('Test /animals/:id route', () => {
  it('expect to get back the object, in the previous POST request, by its specific ID (with name: dumbo, favoriteFood: peanuts, age: 50)', (done) => {
    request('localhost:3000')
      .get('/animals/' + testId)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.status).to.eql(200);
        expect(res.body.data['name']).to.eql('dumbo');
        expect(res.body.data['favoriteFood']).to.eql('peanuts');
        expect(res.body.data['age']).to.eql(50);
        expect(res).to.be.json;
        expect(res.body.data).to.have.a.property('_id');
        done();
      })
  })

  it('expect PUT, to use the same ID in the previous GET, and be equal to name: duck, favoriteFood: bread, age: 1, and with status 200', (done) => {
    request('localhost:3000')
      .put('/animals/' + testId)
      .send('{"name":"duck","favoriteFood":"bread","age":1}')
      .end((err, res) => {
        console.log(res.text);
        expect(err).to.eql(null);
        expect(res.body.status).to.eql(200);
        expect(res.body.data['name']).to.eql('duck');
        // expect(res.body.data['favoriteFood']).to.eql('bread');
        // expect(res.body.data['age']).to.eql(1);
        // expect(res).to.be.a('object');
        // expect(res.body.data['_id']).to.have.eql(testId);
        done();
      })
  })

  // it('expect DELETE to ', (done) => {
  //   request('localhost:3000')
  // })
})
//
// //tests people
// describe('Test /people route', () => {
//   it('expect POST to equal jason, beer, and 13, with a status code 200', (done) => {
//     request('localhost:3000')
//     .post('/people')
//     .send('{"name":"jason","favoriteFood":"beer","age":13}')
//     .end((err, res) => {
//       expect(err).to.eql(null);
//       expect(res.body.status).to.be.eql(200);
//       expect(res.body.data['name']).to.eql('jason');
//       expect(res.body.data['favoriteFood']).to.eql('beer');
//       expect(res.body.data['age']).to.eql(13);
//       done();
//   })
//
//   it('expect GET to status 200, with content-type json', (done) => {
//     request('localhost:3000')
//     .get('/people')
//     .end((err, res) => {
//       expect(err).to.eql(null);
//       expect(res.body.status).to.be.eql(200);
//       expect(res.header['content-type']).to.eql('application/json; charset=utf-8');
//       done();
//   })
// })
//
// describe('Test /people/:id route', () => {
//   it('expect GET to ', (done) => {
//     request('localhost:3000')
//   })
//
//   it('expect PUT to ', (done) => {
//     request('localhost:3000')
//   })
//
//   it('expect DELETE to ', (done) => {
//     request('localhost:3000')
//   })
// })
