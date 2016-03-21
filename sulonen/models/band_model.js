'use strict';

const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
  name: String,
  city: String,
  country: String,
  genre: String,
  bar: String
});

module.exports = mongoose.model('Band', bandSchema);
