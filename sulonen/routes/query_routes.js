'use strict';

let parser = require('body-parser');
let Bar = require('./../models/bar_model');
let handleDBError = require('./../lib/handle_db_error');
let jwtAuth = require('./../lib/jwt_auth');

module.exports = (router) => {
  router.use(parser.json());

  router.route('/bar/')
    .get(jwtAuth, (req, res) => {
      let barName = JSON.parse(req.query.name);
      Bar.find({'name':barName}, (err, bar) => {
        if (err) return console.log(err);
        res.send(bar[0].name + ' is open ' + bar[0].hours);
      });
    });
};
