'use strict';
let PORT = process.env.PORT || require('./.config').PORT;
let DB = process.env.DB || require('./.config').DB;

let bodyParser = require('body-parser');
let express = require('express');
let app = express();

let models = require('./models');
let Movie = models.Movie;
let Snack = models.Snack;

app.use(bodyParser.json());

models.sequelize.sync({force: true}).then(function() {
  Movie.create({
    name: 'shrek',
    imdb: 9.9
  });
  Movie.create({
    name: 'Die Hard',
    imdb: 9.9
  });
  Snack.create({
    name: 'Pizza',
    description: 'This delicious snack is perfect for any movie night'
  });
  Snack.create({
    name: 'Cabbage',
    description: 'This delicious snack is perfect for any movie night'
  });
  app.listen(PORT, function() {
    console.log('server started');
    console.log('listening on PORT: ' + PORT);
    console.log('DB URI STRING: ' + DB);
  });
});

// /movies routes
app.route('/movies')
  .get((req, res) => {
    Movie.findAll().then((movies) => {
      res.send(movies);
    });
  })
  .post((req, res) => {
    Movie.create({
      name: req.body.name,
      imdb: req.body.imdb
    }).then((movie) => {
      res.send(movie);
    });
  });

app.route('/movies/:id')
  .get((req, res) => {
    Movie.findById(req.params.id)
      .then((movie) => {
        res.send(movie);
      });
  })
  .delete((req, res) => {
    Movie.findById(req.params.id).then((movie) => {
      console.log('destroying movie id ', req.params.id);
      movie.destroy()
        .then(() => {
          res.send(movie);
        });
    });
  });

// /snacks routes
app.route('/snacks')
  .get((req, res) => {
    Snack.findAll().then((snacks) => {
      res.send(snacks);
    });
  })
  .post((req, res) => {
    Snack.create({
      name: req.body.name,
      description: req.body.description
    }).then((snack) => {
      res.send(snack);
    });
  });

app.route('/snacks/:id')
  .get((req, res) => {
    Snack.findById(req.params.id)
      .then((snack) => {
        res.send(snack);
      });
  })
  .delete((req, res) => {
    Snack.findById(req.params.id).then((snack) => {
      console.log('destroying snack id ', req.params.id);
      snack.destroy()
        .then(() => {
          res.send(snack);
        });
    });
  });
