'use strict';

let express = require('express');
let authenticate = require('../lib/authenticate');
let jsonParser = require('body-parser').json();
let Customer = require('../models/customers-model');

const customersRouter = module.exports = exports = express.Router();


  customersRouter.route('/customers')
  .get((req, res) => {
    console.log('GET route hit for /customers');
    Customer.find({}).populate('products').exec((err, customers) => {
      res.json({data: customers});
    });
  })
  .post((req, res) => {
    console.log('POST route hit for /customers');
    var newCustomer = new Customer(req.body);
    newCustomer.save((err, customer) => {
      res.json(customer);
    });
  });

  customersRouter.route('/customers/:id')
  .get((req, res) => {
    console.log('GET route hit for /customers/:id');
    Customer.findById(req.params.id, (err, customer) => {
      res.json(customer); //revise
    });
  })
  .put((req, res) => {
    console.log('PUT route hit for /customers/:id');
    Customer.findByIdAndUpdate({id: req.params.id}, req.body, (err, customer) => {
      if (err) return res.send(err);
      res.json(customer);
    });
  })
  .delete((req, res) => {
    console.log('DEL route hit for /customers/:id');
    Customer.findById(req.params.id, (err, customer) => {
      customer.remove((err, customer) => {
        res.json({message: 'customer removed'});
      });
    });
  });
