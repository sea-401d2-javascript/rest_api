'use strict';
var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  date: Date,
  type: String,
  charsPresent: [{ref: 'Character', type: mongoose.Schema.types.ObjectId}],
  location: String
});

module.exports = mongoose.model('Event', eventSchema);
