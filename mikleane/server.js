'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let app = module.exports = express();
let mongoose = require('mongoose');

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

app.use(bodyParser.json());

let beersRouter = require(__dirname + '/routes/beer_routes');
let drinksRouter = require(__dirname + '/routes/drink_routes');
let publicRouter = require(__dirname + '/routes/user_routes');

app.use('/', beersRouter);
app.use('/', drinksRouter);
app.use('/', publicRouter);

app.listen(3000, () => {
  console.log('server started');
});
