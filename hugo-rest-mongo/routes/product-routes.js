' use strict';

let express = require('express');
let jsonParser = rquire('body-parser').json();
let Product = require('./models/products-model');
let handleDBError = require('./lib/db-error-handle');
let authenticate = require('./lib/authenticate');

var productRouter = module.exports = exports = express.Router();
