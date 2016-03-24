'use strict';

let jwt = require('jsonwebtoken');
let Customer = require('../models/customers-model') ;

module.exports = (req, res, next) => {
  var decoded;
  try {
    decoded = jwt.verify(req.headers.token, process.env.SECRET || 'CHANGE ME TO SOMETHING');
  } catch (err) {
    return res.status(401).json({msg: 'authentication error'});
  }

  Customer.findOne({id: decoded._id}, (err, customer) => {
    if (err) {
      console.log(err);
      res.status(401).json({msg: 'authentication error'});
    }
    if(!customer) return res.status(401).json({msg: 'no user found'});
    req.customer = customer;
    next();
  })
}
