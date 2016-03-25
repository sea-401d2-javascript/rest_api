'use strict';

let parser = require('body-parser');
let handleDBError = require('./../lib/handle_db_error');
let basicHTTP = require('./../lib/basic_http');
let User = require('./../models/user_model');

module.exports = (router) => {
  router.use(parser.json());

  router.post('/signup', parser, (req, res) => {
    let headerArray = req.headers.authorization.split(' ');
    let encodedAuth = headerArray[1];
    let authArray = new Buffer(encodedAuth, 'base64')
      .toString().split(':');
    let userName = authArray[0];
    let password = authArray[1];

    User.findOne({name: userName}, (err, user) => {
      if (err) return res.send(err);
      try {
        var valid = user.compareHash(password);
      } catch (e) {
        return res.send(e);
      }
      if (!valid) return res.json({status: 'failure'});
      let token = user.generateToken();
      res.json({token: token});
    });
  });
};

