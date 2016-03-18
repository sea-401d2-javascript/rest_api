'use strict';

var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
  author: String,
  title: String
});

module.exports = mongoose.model('Book', bookSchema);
