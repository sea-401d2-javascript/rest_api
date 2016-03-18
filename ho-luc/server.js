'use strict'

let express = require('express');
let app = express();
let apiRouter = express.Router();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
require('./routes/animals-route')(apiRouter);
require('./routes/people-route')(apiRouter);


mongoose.connect('mongodb://localhost/db')
app.use('/', bodyParser.json(), apiRouter, (req, res) => {
})

app.listen(3000, () => {
  console.log('server started on port 3000');
})
