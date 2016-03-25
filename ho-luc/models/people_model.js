'use strict'
const mongoose = require('mongoose');
const peopleSchema = new mongoose.Schema({
  name: String,
  favoriteFood: String,
  age: Number,
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal'
  }]
})

module.exports = mongoose.model('People', peopleSchema)
