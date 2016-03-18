'use strict';

const express = require('express');
const router = express.Router();
const parser = require('body-parser');

const Bar = require('./../models/bar_model.js');

router.use(parser.json());

router.route('/bars')
  .get((req, res) => {
    Bar.find({}, (err, bars) => {
      res.json({data: bars});
    });
  })

  .post((req, res) => {
    console.log(req.body);
    var newBar = new Bar(req.body);
    newBar.save((err, bar) => {
      res.json(bar);
    });
  });

router.route('/bars/:id')
  .get((req, res) => {
    Bar.findById(req.params.id, (err, bar) => {
      res.json(bar);
    });
  })

  .put((req, res) => {
    Bar.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) return res.send(err);
      res.json({msg: 'success'});
    });
  })

  .delete((req, res) => {
    Bar.findById(req.params.id, (err, bar) => {
      bar.remove((err) => {
        if (err) return res.send(err);
        res.json({msg: 'bar removed'});
      });
    });
  });

module.exports = router;
