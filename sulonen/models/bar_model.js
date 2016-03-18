'use strict';

const mongoose = require('mongoose');

const barSchema = new mongoose.Schema({
  name: String,
  neighborhood: String,
  hours: String
});

module.exports = mongoose.model('Bar', barSchema);
