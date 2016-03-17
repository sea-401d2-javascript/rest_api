'use strict';

let Customer = require(__dirname + '/../models/customer-model.js');

module.exports = (apiRouter) => {
  apiRouter.route('/customers')
    .get((req, res) => {
      Customer.find({}, (err, customers) => {
        if (err) {console.error(err);}
        res.json({data: customers});
      });
    })
    .post((req, res) => {
      var newCustomer = new Customer(req.body);
      newCustomer.save((err, customer) => {
        if (err) {console.error(err);}
        res.json(customer);
      });
    });

  apiRouter.route('/customers/:id')
    .get((req, res) => {
      Customer.findById(req.params.id, (err, customer) => {
        if (err) {console.error(err);}
        res.json(customer);
      });
    })
    .put((req, res) => {
      Customer.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, customer) => {
        if (err) {console.error(err);}
        res.json(customer);
      });
    })
    .delete((req, res) => {
      Customer.findByIdAndRemove(req.params.id, (err, customer) => {
        if (err) {console.error(err);}
        res.json(customer);
      });
    });
};