'use strict';
let mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
  name: String,
  track: String
});

module.exports = mongoose.model('Student', studentSchema);
