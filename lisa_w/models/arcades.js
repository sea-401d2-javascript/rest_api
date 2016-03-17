'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ArcadeSchema = new Schema({
  name: String,
  address: String,
  updated: {type: Date, default: Date.now },
  id: Schema.Types.ObjectId,
  games: [{
    type: Schema.Types.ObjectId,
    ref: 'Games'
  }
  ]

});


let Arcade = mongoose.model('Arcade', ArcadeSchema);
module.exports = Arcade;
