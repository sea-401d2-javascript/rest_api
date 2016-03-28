'use strict';
let authenticate = require('../lib/authenticate');
let Movie = require('../models/movie_module');

module.exports = (router) => {
  router.route('/movies')
  .all(authenticate)
  .get((req, res) => {
    console.log('movies.js GET request received for /movies');
    Movie.find({})
    .populate('actors')
    .exec((err, movies) => {
      if (err) return res.send(err);
      res.json(movies);
    });
  })
  .post((req, res) => {
    console.log('movies.js POST request received for /movies');
    var newMovie = new Movie(req.body);
    newMovie.save((err, movie) => {
      res.json(movie);
    });
  });

  router.route('/movies/:id')
  .all(authenticate)
  .get((req, res) => {
    console.log('movies.js GET request received for /movies/' + req.params.id);
    Movie.findById(req.params.id)
    .populate('actors')
    .exec((err, movie) => {
      res.json(movie);
    });
  })
  .put((req, res) => {
    console.log('PUT request received for /movies/' + req.params.id);
    Movie.update({_id: req.params.id}, req.body, (err, movie) => {
      res.json(movie);
    });
  })
  .delete((req, res) => {
    console.log('DELETE request received for /movies/' + req.params.id);
    Movie.findById(req.params.id, (err, movie) => {
      movie.remove();
      res.json(movie);
    });
  });
};
