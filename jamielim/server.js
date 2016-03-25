'use strict';

let express = require('express');
let app = express();
let apiRouter = express.Router();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let config = require(__dirname + '/config/env.js');

require(__dirname + '/routes/books-routes.js')(apiRouter);
require(__dirname + '/routes/customers-routes.js')(apiRouter);

mongoose.connect(config.MONGOLAB_URI);

app.use(bodyParser.json());
app.use('/', apiRouter);

app.listen(config.PORT, () => {
  console.log('server started on port ' + config.PORT);
});