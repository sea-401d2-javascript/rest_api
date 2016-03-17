'use strict';

module.exports = (middleRouter) => {
  middleRouter.route('/customers')
  .get((req, res) => {
    console.log('GET route hit for /customers');
    Customer.find({}, (err, customers) => {
      res.json({data: customers})
    });
  })
  .post((req, res) => {
    console.log('POST route hit for /customers');
    var newCustomer = new Customer(req.body);
    newCustomer.save((err, customer) => {
      res.json(customer);
    });
  });

  middleRouter.route('customers/:id')
  .get((req, res) => {
    console.log('GET route hit for /customers/:id');
    Customer.findById(req.params.id, (err, res) => {
      res.json(customer); //revise
    });
  })
  .put((req, res) => {
    console.log('PUT route hit for /customers/:id');
    Customer.update({id: req.params.id}, req.body, (err, customer) => {
      if (err) return res.send(err);
      res.json(customer);
    });
  })
  .delete((req, res) => {
    console.log('DEL route hit for /customers/:id');
    Customer.findById
  });

  middleRouter.route('/products')
  .get((req, res) => {
    console.log('GET route hit for /products');
  })
  .post((req, res) => {
    console.log('POST route hit for /products');
  });
  middleRouter.route('/products/:id')
  .get((req, res) => {
    console.log('GET route hit for /products/:id');
  })
  .put((req, res) => {
    console.log('PUT route hit for /products/:id');
  })
  .delete((req, res) => {
    console.log('DEL route hit for /products/:id');
  });

  middleRouter.route('/unicorns')
  .get((req, res) => {
    console.log('GET route hit for /unicorns');
  })
  .post((req, res) => {
    console.log('POST route hit for /unicorns');
  })
}
