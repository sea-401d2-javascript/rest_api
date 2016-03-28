'use strict';

let express = require('express');
let app = module.exports = exports = express();
let config = require('./config/env');

let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Token'); //maybe revise
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

//routers

let authRouter = require('./routes/product-routes');
let productsRouter = require('./routes/auth-routes');
let customersRouter = require('./routes/customer-routes');

//models
let customers = require(__dirname + '/models/customers-model');
let products = require('./models/products-model');


app.use(bodyParser.json());
app.use('/', productsRouter);
app.use('/', authRouter);
app.use('/', customersRouter);

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
