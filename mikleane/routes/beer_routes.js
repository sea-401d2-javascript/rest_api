'use strict';

let express = require('express');
let tokenAuth = require(__dirname + '/../lib/tokenauth');
let Beers = require(__dirname + '/../models/beer_model');

let beerRouter = module.exports = exports = express.Router();


beerRouter.get('/beers', tokenAuth, (req, res) => {
  Beers.find({}, (err, beers)=> {
    res.json({data: beers});
  });
});

beerRouter.get('/beers/:id', tokenAuth,(req, res) => {
  Beers.findById(req.params.id, (err, beer) => {
    res.json(beer);
  });
});

beerRouter.post('/beers', tokenAuth, (req, res) => {
  var newBeer = new Beers(req.body);
  newBeer.save((err, beer) => {
    res.json(beer);
  });
});

beerRouter.put('/beers/:id',tokenAuth, (req,res) => {
  Beers.findByIdAndUpdate(req.params.id, req.body, (err, beer) => {
    if (err) return res.send(err);
    res.json(beer);
  });
});

beerRouter.delete('/beers/:id',tokenAuth, (req, res) => {
  Beers.findById(req.params.id, (err, beer) => {
    beer.remove(() => {
      res.json({message: 'beer removed'});
    });
  });
});
