'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let config = require('./config/env');

let mongoose = require('mongoose');
let customers = require( './models/customers-model.js');
let products = require('./models/products-model.js');

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

let middleRouter = express.Router();
require('./routes/route-handle')(middleRouter);

app.use(bodyParser.json());
app.use('/', middleRouter); //bodyparser.json()
app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
