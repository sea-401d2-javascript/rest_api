'use strict';

let mongoose = require('mongoose');

let beerSchema = new mongoose.Schema({
  name: String,
  type: {type: String, default: 'ale'},
  style: String,
  ABV: Number,
  brewery: String
});


module.exports = mongoose.model('Beers', beerSchema);
