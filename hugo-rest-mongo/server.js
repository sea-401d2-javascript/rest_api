'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let config = require(__dirname + '/config/env');

let mongoose = require('mongoose');
let customers = require(__dirname + '/models/customers-model.js');
let products = require(__dirname + '/models/products-model.js');

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb:localhost/db';
mongoose.connect(DB_PORT);

let middleRouter = express.Router();
require(__dirname + '/routes/route-handle')(middleRouter);

app.use('/', middleRouter);
app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
