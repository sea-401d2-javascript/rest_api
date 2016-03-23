'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = module.exports = exports = express();
let config = require('./config/env');

let mongoose = require('mongoose');
let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Token'); //maybe revise
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

let productsRouter = require('./routes/product-routes');
let productsRouter = require('./routes/auth-routes');
let productsRouter = require('./routes/customer-routes');


let customers = require(__dirname + '/models/customers-model');
let products = require('./models/products-model');

// let middleRouter = express.Router();
// require(__dirname + '/routes/route-handle')(middleRouter);

app.use(bodyParser.json());
// app.use('/', middleRouter);
app.use('/', productsRouter);
app.use('/', authRouter);
app.use('/', customersRouter);

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
