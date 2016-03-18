'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Recipes = require(__dirname + '/models/recipe_model.js');
var Chefs = require(__dirname + '/models/chef_model.js');


var DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

app.use(bodyParser.json());

app.get('/recipes', (req, res) => {
  Recipes.find({}, (err, recipe) => {
    res.json({data: recipe});
  });
});

app.get('/recipes/:id', (req, res) => {
  Recipes.findById(req.params.id, (err, recipe) => {
    res.json(recipe);
  });
});

app.post('/recipes', (req, res) => {
  var newRecipe = new Recipes(req.body);
  newRecipe.save((err, recipe) => {
    res.json(recipe);
  });
});

app.put('/recipes/:id', (req, res) => {
  Recipes.findByIdAndUpdate(req.params.id, req.body, (err, recipe) => {
    if (err) return res.send(err);
    res.json(recipe);
  });
});

app.delete('/recipes/:id', (req, res) => {
  Recipes.findById(req.params.id, (err, recipe) => {
    recipe.remove((err, recipe) => {
      res.json({message: "recipe removed"});
    });
  });
});

app.get('/chefs', (req, res) => {
  Chefs.find({}, (err, chef) => {
    res.json({data: chef});
  });
});

app.get('/chefs/:id', (req, res) => {
  Chefs.findById(req.params.id)
    .populate('recipes', 'name')
    .exec((err, chef) => {
      console.log(chef);
      res.json(chef);
    });
});

app.post('/chefs', (req, res) => {
  var newChef = new Chefs(req.body);
  newChef.save((err, chef) => {
    res.json(chef);
  });
});

// app.put('/chefs/:id/recipes', (req, res) => {
//   Chefs.findByIdAndUpdate(req.params.id, {$push: req.body}, (err, chef)=>{
//     if (err) return res.send(err);
//     res.json(chef);
//   });
// });

app.put('/chefs/:id', (req, res) => {
  Chefs.findByIdAndUpdate(req.params.id, req.body, (err, chef) => {
    if (err) return res.send(err);
    res.json(chef);
  });
});


app.delete('/chefs/:id', (req, res) => {
  Chefs.findById(req.params.id, (err, chef) => {
    chef.remove((err, chef) => {
      res.json({message: "chef removed"});
    });
  });
});


app.listen(3000, () => {
  console.log('server is up on 3000');
});
