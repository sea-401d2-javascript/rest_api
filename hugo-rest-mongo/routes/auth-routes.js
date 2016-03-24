let express = require('express');
let Customer = require('./models/customers-model')
let jsonParser = require('body-parser').json();
let handleDBError = require('./lib/db-error-handle');
let baseHTTP = require('./lib/base-http');

var authRouter = module.exports = exports = express.Router();

authRouter.post()
