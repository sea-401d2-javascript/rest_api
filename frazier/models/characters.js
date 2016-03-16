'use strict';
var mongoose = require('mongoose');

var characterSchema = new mongoose.Schema({
  name: String,
  race: String,
  age: Number,
  presentAt: [{ref: 'Event', type: mongoose.Schema.types.ObjectId}],
  alive: {type: Boolean, default: true},
  notableItems: [
    {
      name: String, 
      type: [{type: String}]
    }
  ]
  // diedAt: {ref: 'Event', type: mongoose.Schema.types.ObjectId}
});

module.exports = mongoose.model('Character', characterSchema);
