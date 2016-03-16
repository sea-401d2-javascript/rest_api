'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let mongoose = require('mongoose');
let customers = require('./models/customers-model.js');
let products = require('./models/products-model.js');

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb:localhost/db';
mongoose.connect(DB_PORT);
