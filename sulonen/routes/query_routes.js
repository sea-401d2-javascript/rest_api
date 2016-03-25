'use strict';

let parser = require('body-parser');
let Bar = require('./../models/bar_model');

module.exports = (router) => {
  router.use(parser.json());

  router.route('/bar/')
    .get((req, res) => {
      let barName = JSON.parse(req.query.name);
      Bar.find({'name':barName}, (err, bar) => {
        if (err) return res.json(err);
        res.send(bar[0].name + ' is open ' + bar[0].hours);
      });
    });
};
