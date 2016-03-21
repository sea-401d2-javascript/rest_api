'use strict';

const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
  name: String,
  type: {type: String, default: 'ale'},
  style: String,
  ABV: Number,
  brewery: String
});


module.exports = mongoose.model('Beers', beerSchema);
