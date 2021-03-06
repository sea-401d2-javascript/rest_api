'use strict';

let parser = require('body-parser');
let Band = require('./../models/band_model');
let handleDBError = require('./../lib/handle_db_error');
let jwtAuth = require('./../lib/jwt_auth');

module.exports = (router) => {
  router.use(parser.json());

  router.route('/bands')
    .get(jwtAuth, (req, res) => {
      Band.find({}, (err, Bands) => {
        if (err) return console.log(err);
        res.json({data: Bands});
      });
    })

    .post(jwtAuth, (req, res) => {
      var newBand = new Band(req.body);
      newBand.save((err, Band) => {
        if (err) return console.log(err);
        res.json(Band);
      });
    });

  router.route('/bands/:id')
    .get(jwtAuth, (req, res) => {
      Band.findById(req.params.id, (err, Band) => {
        if (err) return console.log(err);
        res.json(Band);
      });
    })

    .put(jwtAuth, (req, res) => {
      Band.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) return console.log(err);
        res.json({msg: 'success'});
      });
    })

    .delete(jwtAuth, (req, res) => {
      Band.findById(req.params.id, (err, Band) => {
        Band.remove((err) => {
          if (err) return console.log(err);
          res.json({msg: 'band removed'});
        });
      });
    });
};
