'use strict';

module.exports = (middleRouter) => {
  middleRouter.route('/customers')
  .get((req, res) => {
    console.log('GET route hit for /customers');
  })
  .post((req, res) => {
    console.log('POST route hit for /customers');
  });
  middleRouter.route('customers/:id')
  .get((req, res) => {
    console.log('GET route hit for /customers/:id');
  })
  .put((req, res) => {
    console.log('PUT route hit for /customers/:id');
  })
  .delete((req, res) => {
    console.log('DEL route hit for /customers/:id');
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
