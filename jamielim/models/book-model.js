'use strict';

const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  quantity: {type: Number, default: 0},
  isAvailable: {type: Boolean, default: false}
});

module.exports = mongoose.model('Book', bookSchema);