'use strict';

const express = require('express');
const router = express.Router();
const parser = require('body-parser');

const Bar = require('./../models/bar_model.js');

router.use(parser.json());

router.route('/bar/')
  .get((req, res) => {
    console.log(req);
    //let name = JSON.parse(req.query.name);
    // Bar.find({'name':name}, (err, bar) => {
    //   res.write(bar.name + 'is open from' + bar.hours);
    // });
  });

module.exports = router;
