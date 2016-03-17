'use strict';
var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  name: String,
  date: {
    day: Number,
    month: Number,
    year: Number,
    age: String
  },
  category: [String],
  charsPresent: [{ref: 'Character', type: mongoose.Schema.Types.ObjectId}],
  location: String
});

module.exports = mongoose.model('Event', eventSchema);
