'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ArcadeSchema = new Schema({
  name: String,
  address: String,
  updated: {type: Date, default: Date.now },
  games: [{
    type: Schema.Types.ObjectId,
    ref: 'Game'
  }
  ]

});





let Arcade = mongoose.model('Arcade', ArcadeSchema);
module.exports = Arcade;
