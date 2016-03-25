'use strict';

let express = require('express');
let Customer = require('../models/customers-model');
let jsonParser = require('body-parser').json();
let handleDBError = require('../lib/db-error-handle');
let baseHTTP = require('../lib/base-http');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/createaccount', jsonParser, (req, res) => {
  var newCustomer = new Customer(req.body);
  if (!((req.body.name || '').length && (req.body.password || '').length > 6)) {
    return res.status(400).json({msg: 'Sorry. The username or password you entered is invalid.'});
  }

  newCustomer.username = req.body.name || req.body.email;
  newCustomer.email = req.body.email;
  newCustomer.password = req.body.password;
  newCustomer.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json({token: data.generateToken()});
  });
});


authRouter.post('/login', baseHTTP, (req, res) => {
  console.log('authentication name is ', req.baseHTTP.name);
  Customer.findOne({name: req.baseHTTP.name}, (err, customer) => {
    console.log('customer is: ', customer);
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'Sorry, something is wrong with the credentials customer not found'});
    }

    if (!customer) return res.status(401).json({msg: 'Sorry, something went wrong with the credentials there is no customer'});

    if (!customer.compareHash(req.baseHTTP.password)) return res.status(401).json({msg: 'Sorry, something is wrong with the credentials wrong password'});

    res.json({token: customer.generateToken()});
  });
});
