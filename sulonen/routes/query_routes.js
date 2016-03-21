'use strict';

const express = require('express');
const router = express.Router();
const parser = require('body-parser');

const Bar = require('./../models/bar_model.js');

router.use(parser.json());

router.route('/bar/')
  .get((req, res) => {
    let barName = JSON.parse(req.query.name);
    Bar.find({'name':barName}, (err, bar) => {
      res.send(bar[0].name + ' is open ' + bar[0].hours);
    });
  });

module.exports = router;
