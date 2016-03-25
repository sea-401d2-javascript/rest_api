'use strict';
var mongoose = require('mongoose');

var characterSchema = new mongoose.Schema({
  name: String,
  race: String,
  age: Number,
  presentAt: [{ref: 'Event', type: mongoose.Schema.Types.ObjectId}],
  kia: {type: Boolean, default: false},
  notableItems: [
    {
      name: String, 
      category: [{type: String}]
    }
  ]
  // diedAt: {ref: 'Event', type: mongoose.Schema.types.ObjectId}
});

module.exports = mongoose.model('Character', characterSchema);
