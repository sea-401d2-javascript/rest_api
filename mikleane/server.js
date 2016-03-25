'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let mongoose = require('mongoose');
let Beers = require('./models/beer_model');
let Drinks = require('./models/drink_model');

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

app.use(bodyParser.json());

app.get('/beers', (req, res) => {
  Beers.find({}, (err, beers)=> {
    res.json({data: beers});
  });
});

app.get('/beers/:id', (req, res) => {
  Beers.findById(req.params.id, (err, beer) => {
    res.json(beer);
  });
});

app.post('/beers', (req, res) => {
  var newBeer = new Beers(req.body);
  newBeer.save((err, beer) => {
    res.json(beer);
  });
});

app.put('/beers/:id', (req,res) => {
  Beers.findByIdAndUpdate(req.params.id, req.body, (err, beer) => {
    if (err) return res.send(err);
    res.json(beer);
  });
});

app.delete('/beers/:id', (req, res) => {
  Beers.findById(req.params.id, (err, beer) => {
    beer.remove(() => {
      res.json({message: 'beer removed'});
    });
  });
});

app.get('/drinks', (req, res) => {
  Drinks.find({}, (err, drinks) => {
    res.json({data: drinks});
  });
});

app.get('/drinks/:id', (req, res) => {
  Drinks.findById(req.params.id, (err, drink) => {
    res.json(drink);
  });
});

app.post('/drinks', (req, res) => {
  var newDrink = new Drinks(req.body);
  newDrink.save((err, drink) => {
    res.json(drink);
  });
});

app.put('/drinks/:id', (req, res) => {
  Drinks.findByIdAndUpdate(req.params.id, req.body, (err, drink) => {
    if (err) return res.send(err);
    res.json(drink);
  });
});

app.delete('/drinks/:id', (req, res) => {
  Drinks.findById(req.params.id, (err, drink) => {
    drink.remove(() => {
      res.json({message: 'drink removed'});
    });
  });
});
app.get('/search/', (req, res) => {
  var alcohol = JSON.parse(req.query.alcohol);
  Drinks.find({'alcohol': alcohol}, (err, drinks)=> {
    res.json(drinks);
  });
});


app.listen(3000, () => {
  console.log('server started');
});
