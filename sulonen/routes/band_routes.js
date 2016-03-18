'use strict';

const express = require('express');
const router = express.Router();
const parser = require('body-parser');

const Band = require('./../models/band_model.js');

router.use(parser.json());

router.route('/bands')
  .get((req, res) => {
    Band.find({}, (err, Bands) => {
      res.json({data: Bands});
    });
  })

  .post((req, res) => {
    console.log(req.body);
    var newBand = new Band(req.body);
    newBand.save((err, Band) => {
      res.json(Band);
    });
  });

router.route('/bands/:id')
  .get((req, res) => {
    Band.findById(req.params.id, (err, Band) => {
      res.json(Band);
    });
  })

  .put((req, res) => {
    Band.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) return res.send(err);
      res.json({msg: 'success'});
    });
  })

  .delete((req, res) => {
    Band.findById(req.params.id, (err, Band) => {
      Band.remove((err) => {
        if (err) return res.send(err);
        res.json({msg: 'band removed'});
      });
    });
  });

module.exports = router;
