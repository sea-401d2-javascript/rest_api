'use strict';
let authenticate = require('../lib/authenticate');
let Snack = require('../models/snack_module');
let Movie = require('../models/movie_module');


module.exports = (router) => {
  router.route('/suggest')
    .all(authenticate)
    .get((req, res, next) => {
      console.log('GET request received for /suggest');
      res.suggestion = {};
      next();
    })
    .get((req, res, next) => {
      console.log('Getting random movie');
      Movie.find({})
        .populate('actors')
        .exec((err, movies) => {
          if (err) return res.send(err);
          let random = Math.floor(Math.random() * movies.length);
          res.suggestion.movie = movies[random];
          next();
        });
    })
    .get((req, res, next) => {
      console.log('Getting random snack');
      Snack.find({}, (err, snacks) => {
        if (err) return res.send(err);
        let random = Math.floor(Math.random() * snacks.length);
        res.suggestion.snack = snacks[random];
        next();
      });
    })
    .get((req, res) => {
      console.log('Returning random movie and random snack');
      res.json(res.suggestion);
    });
};
