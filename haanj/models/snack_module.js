'use strict';
const mongoose = require('mongoose');

const snackSchema = new mongoose.Schema({
  name: String,
  ingredients: [{name: String}],
  tags: [{keyword: String}]
});

module.exports = mongoose.model('Snack', snackSchema);
