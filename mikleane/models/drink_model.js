'use strict';

let mongoose = require('mongoose');

let drinkSchema = new mongoose.Schema({
  name: String,
  alcohol: [String],
  mixer: [String],
  garnish: [String],
  glass: String
});


module.exports = mongoose.model('Drinks', drinkSchema);
