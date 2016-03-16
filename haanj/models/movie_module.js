'use strict';
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: String,
  imbd: Number,
  tags: [{keyword: String}],
  actors: [{name: String}]
});

module.exports = mongoose.model('Movie', movieSchema);
