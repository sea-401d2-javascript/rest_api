'use strict';

const mongoose = require('mongoose');

const drinkSchema = new mongoose.Schema({
  name: String,
  alcohol: [String],
  mixer: [String],
  garnish: [String],
  glass: String
});


module.exports = mongoose.model('Drinks', drinkSchema);
