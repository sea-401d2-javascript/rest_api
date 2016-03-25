'use strict';

let parser = require('body-parser');
let Band = require('./../models/band_model');

module.exports = (router) => {
  router.use(parser.json());

  router.route('/bands')
    .get((req, res) => {
      Band.find({}, (err, Bands) => {
        res.json({data: Bands});
      });
    })

    .post((req, res) => {
      var newBand = new Band(req.body);
      newBand.save((err, Band) => {
        if (err) return res.json(err);
        res.json(Band);
      });
    });

  router.route('/bands/:id')
    .get((req, res) => {
      Band.findById(req.params.id, (err, Band) => {
        if (err) return res.json(err);
        res.json(Band);
      });
    })

    .put((req, res) => {
      Band.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) return res.json(err);
        res.json({msg: 'success'});
      });
    })

    .delete((req, res) => {
      Band.findById(req.params.id, (err, Band) => {
        Band.remove((err) => {
          if (err) return res.json(err);
          res.json({msg: 'band removed'});
        });
      });
    });
};
