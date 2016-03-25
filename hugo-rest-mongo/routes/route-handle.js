'use strict';
let Customer = require(__dirname + '/../models/customers-model');
let Product = require(__dirname + '/../models/products-model');

module.exports = (middleRouter) => {
  middleRouter.route('/customers')
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

  middleRouter.route('/customers/:id')
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
      })
    })
  });

//product routes

  middleRouter.route('/products')
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
  middleRouter.route('/products/:id')
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

  middleRouter.route('/stock-count')
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
};
