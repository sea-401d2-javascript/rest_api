'use strict';

const express = require('express');
const mongoose = require('mongoose');
const MONGO_DB = process.env.MONGO_DB || 'mongodb://localhost/db';

let bars = require('./routes/bar_routes');
let bands = require('./routes/band_routes');
let queries = require('./routes/query_routes');

mongoose.connect(MONGO_DB);

let app = express();
app.use('/', bars);
app.use('/', bands);
app.use('/', queries);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// curl -H "Content-type: application/json" -d '{"name":"Hatties Hat","neighborhood":"Ballard","hours":"3pm - 3am"}' localhost:3000/bars
// curl -H "Content-type: application/json" -d '{"name":"Tractor Tavern","neighborhood":"Ballard","hours":"4pm - 3am"}' localhost:3000/bars
// curl -H "Content-type: application/json" -d '{"name":"Pink Door","neighborhood":"Pike Place Market","hours":"4pm - 3am"}' localhost:3000/bars
