'use strict';
// var mongoose = require('mongoose');
// var resources = require(__dirname + '/../lib/resources.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = chai.request;
var expect = chai.expect;

require(__dirname + '/../server.js');


// describe('unit test', () => {
//   describe('resources.js', () => {
//     it('should let you read', () => {
//       
//     });
//     it('should let you write', () => {
//       
//     });
//     it('should let you update', () => {
//       
//     });
//     it('should let you delete', () => {
//       
//     });
//   });
// });

describe('integration tests', () => {
  var gimli = {
    name: 'Gimli',
    race: 'Dwarf',
    age: 139
  };
  describe('server.js and routes', () => {
    // describe('/events route', () => {
    //   it('should let you read', () => {
    //     
    //   });
    //   it('should let you write', () => {
    //     
    //   });
    //   it('should let you update', () => {
    //     
    //   });
    //   it('should let you delete', () => {
    //     
    //   });
    // });
    describe('/characters route', () => {
      it('should let you post characters', (done) => {
        request('localhost:3000').post('/characters').send(JSON.stringify(gimli))
        .end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          done();
        });
      });
      
      it('should let you read all characters', (done) => {
        request('localhost:3000').post('/characters').end((err, response) => {
          expect(err).to.equal(null);
          expect(response.status).to.equal(200);
          expect(JSON.parse(response.body)).to.equal(gimli);
          done();
        });
      });
      
      // it('should let you read one', () => {
      //   
      // });
      // it('should let you update one', () => {
      //   
      // });
      // it('should let you delete one', () => {
      //   
      // });
    });
  });  
});
