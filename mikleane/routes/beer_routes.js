'use strict';

const express = require('express');
let bodyParser = require('body-parser');
const Beers = require(__dirname + '/../models/beer_model');
// const jwtAuth = require(__dirname + '/../lib/tokenauth.js');

var beerRouter = module.exports = exports = express.Router();

beerRouter.get('/beers', (req, res) => {
  Beers.find({}, (err, beers)=> {
    res.json({data: beers});
  });
});

beerRouter.get('/beers/:id', (req, res) => {
  Beers.findById(req.params.id, (err, beer) => {
    res.json(beer);
  });
});

beerRouter.post('/beers', (req, res) => {
  var newBeer = new Beers(req.body);
  newBeer.save((err, beer) => {
    res.json(beer);
  });
});

beerRouter.put('/beers/:id', (req,res) => {
  Beers.findByIdAndUpdate(req.params.id, req.body, (err, beer) => {
    if (err) return res.send(err);
    res.json(beer);
  });
});

beerRouter.delete('/beers/:id', (req, res) => {
  Beers.findById(req.params.id, (err, beer) => {
    beer.remove(() => {
      res.json({message: 'beer removed'});
    });
  });
});
