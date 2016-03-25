'use strict';

const express = require('express');
// let bodyParser = require('body-parser');
const Drinks = require(__dirname + '/../models/drink_model');
// const jwtAuth = require(__dirname + '/../lib/tokenauth.js');
const tokenAuth = require(__dirname + '/../lib/tokenauth');
var drinkRouter = module.exports = exports = express.Router();
// drinkRouter.use(bodyParser.json());

drinkRouter.get('/drinks', tokenAuth, (req, res) => {
  Drinks.find({}, (err, drinks) => {
    res.json({data: drinks});
  });
});

drinkRouter.get('/drinks/:id', tokenAuth, (req, res) => {
  Drinks.findById(req.params.id, (err, drink) => {
    res.json(drink);
  });
});

drinkRouter.post('/drinks', tokenAuth, (req, res) => {
  var newDrink = new Drinks(req.body);
  newDrink.save((err, drink) => {
    res.json(drink);
  });
});

drinkRouter.put('/drinks/:id', tokenAuth, (req, res) => {
  Drinks.findByIdAndUpdate(req.params.id, req.body, (err, drink) => {
    if (err) return res.send(err);
    res.json(drink);
  });
});

drinkRouter.delete('/drinks/:id', tokenAuth, (req, res) => {
  Drinks.findById(req.params.id, (err, drink) => {
    drink.remove(() => {
      res.json({message: 'drink removed'});
    });
  });
});
drinkRouter.get('/search/', tokenAuth, (req, res) => {
  var alcohol = JSON.parse(req.query.alcohol);
  Drinks.find({'alcohol': alcohol}, (err, drinks)=> {
    res.json(drinks);
  });
});
