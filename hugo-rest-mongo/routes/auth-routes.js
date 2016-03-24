'use strict';

let express = require('express');
let Customer = require('../models/customers-model');
let jsonParser = require('body-parser').json();
let handleDBError = require('../lib/db-error-handle');
let baseHTTP = require('../lib/base-http');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/createaccount', jsonParser, (req, res) => {
  var newCustomer = new Customer();
  if (!((req.body.name || '').length && (req.body.password || '').length > 8)) {
    return res.status(400).json({msg: 'Sorry. The username or password you entered is invalid.'});
  }

  newCustomer.username = req.body.name || req.body.email;
  newCustomer.authentication.email = req.body.email;
  newCustomer.hashPassword(req.body.password);
  newCustomer.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({token: data.generateToken()});
  });
});


authRouter.post('/login', baseHTTP, (req, res) => {
  Customer.findOne({'authentication.email': req.baseHTTP.email}, (err, customer) => {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'Sorry, something is wrong with the credentials'});
    }

    if (!customer) return res.status(401).json({msg: 'Sorry, something went wrong with the credentials'});

    if (!customer.compareHash(req.baseHTTP.password)) return res.status(401).json({msg: 'Sorry, something is wrong with the credentials'});

    res.json({token: customer.generateToken()});
  });
});
