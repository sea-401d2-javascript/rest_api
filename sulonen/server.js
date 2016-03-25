'use strict';

let express = require('express');
let mongoose = require('mongoose');
let morgan = require('morgan');

const MONGO_DB = process.env.MONGO_DB || 'mongodb://localhost/db';
mongoose.connect(MONGO_DB);

let authRouter = express.Router();
require('./routes/auth_routes')(authRouter);

let apiRouter = express.Router();
require('./routes/user_routes')(apiRouter);
require('./routes/bar_routes')(apiRouter);
require('./routes/band_routes')(apiRouter);
require('./routes/query_routes')(apiRouter);

let app = express();
app.use(morgan('dev'));
app.use('/', authRouter);
app.use('/', apiRouter);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

