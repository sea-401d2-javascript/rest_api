'use strict';

let express = require('express');
let jsonParser = require('body-parser').json();
let Product = require('../models/products-model');
let handleDBError = require('../lib/db-error-handle');
let authenticate = require('../lib/authenticate');

var productsRouter = module.exports = exports = express.Router();

productsRouter.route('/products')
.get((req, res) => {
  console.log('GET route hit for /products');
  Product.find({}, (err, products) => {
    res.json({data: products});
  });
})
.post((req, res) => {
  console.log('POST route hit for /products');
  var newProduct = new Product(req.body);
  newProduct.save((err, product) => {
    res.json(product);
  });
});
productsRouter.route('/products/:id')
.get((req, res) => {
  console.log('GET route hit for /products/:id');
  Product.findById(req.params.id, (err, product) => {
    res.json(product);
  });
})
.put((req, res) => {
  console.log('PUT route hit for /products/:id');
  Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
    if (err) return res.send(err);
    res.json(product);
  });
})
.delete((req, res) => {
  console.log('DEL route hit for /products/:id');
  Product.findById(req.params.id, (err, product) => {
    product.remove((err, product) => {
      res.json({message: 'product removed'});
    });
  });
});

productsRouter.route('/stock-count')
.get((req, res) => {
  console.log('GET route hit for /stock-count');
  Product.aggregate([
    {$group: {_id: '$id', stockAvg: { $avg: '$stock'}}}
  ], (err, results) => {
    if (err) {
      console.error(err);
    } else {
      var avg = Math.round(results[0].stockAvg).toFixed(2);
      res.send('the average stock count for all products is ' + avg);
    }
  });
});
