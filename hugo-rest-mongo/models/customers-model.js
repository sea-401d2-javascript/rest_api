'use strict';

const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Customer', customerSchema);
