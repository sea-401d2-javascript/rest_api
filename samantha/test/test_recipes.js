'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var request = chai.request;

var Recipes = require(__dirname + '/../models/recipe_model.js');
// var Chefs = require(__dirname + '/../models/chef_model.js');

process.env.MONGOLAB_URI = 'mongodb://localhost/test_db';

require(__dirname + '/../server.js');

describe('test REST api', function () {

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a new recipe', function(done)  {
    request('localhost:3000')
      .post('/recipes')
      .send({name: 'Oatmeal Cookies'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('Oatmeal Cookies');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  it('should get all recipes in the  db', function(done) {
    request('localhost:3000')
      .get('/recipes')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        done();
      });
  });

  describe('tests need a recipe in the db to work with', function() {
    beforeEach(function(done) {
      var testRecipe = new Recipes({name: 'test recipe', cookTime: '30 Min', ingredients: [{'item':'oatmeal', 'amount':'1C'}]});
      // var testRecipe2 = new Recipes({name: 'test cookies', ingredients: [{'item':'oatmeal', 'amount':'1C'}]});
      // var testRecipe3 = new Recipes({name: 'test shortbread', ingredients: [{'item':'butter', 'amount':'1C'}]});
      testRecipe.save(function(err, data) {
        if(err) throw err;
        this.testRecipe = data;
        done();
      }.bind(this));
    });

    it('should be able to make a recipe in a beforeEach block', function() {
      expect(this.testRecipe.name).to.eql('test recipe');
      expect(this.testRecipe.cookTime).to.eql('30 Min');
      expect(this.testRecipe).to.have.property('name');
    });

    it('should take a param to give a list of recipes with an ingredient', function(done){
      request('localhost:3000')
      .get('/search/?ingredient="oatmeal"')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('object');
        done();
      });
    });

    it('should update a recipe page', function(done) {
      var id = this.testRecipe._id;
      request('localhost:3000')
      .put('/recipes/' + id)
      .send('{"name": "new recipe name"}')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('name');
        done();
      });
    });

    it('should be able to delete a recipe', function(done) {
      var id = this.testRecipe._id;
      request('localhost:3000')
        .delete('/recipes/' + id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body).to.eql({message: 'recipe removed'});
          done();
        });
    });
  });
});


// it('should be able to create a new chef', (done) => {
//   chai.request('localhost:3000')
//   .post('/chefs')
//   .send({"name": "Rachel Ray", "funFact":"Loves Dogs", "ingredients":  [{"item":"oatmeal", "amount":"1C"}]})
//   .end((err, res) => {
//     expect(err).to.eql(null);
//     expect(res.body.name).to.eql("Rachel Ray");
//     expect(res.body).to.have.property('_id');
//     done();
//   });
// });
