'use strict';

let express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  app = express(),
  publicRouter = express.Router(),
  models = require('./models');

app.use(bodyParser.json());

app.use('/', publicRouter);
require('./routes/user-routes')(publicRouter, models);
require('./routes/team-routes')(publicRouter, models);
require('./routes/player-routes')(publicRouter, models);

app.listen(3000, () => {
  console.log('server started');
});
