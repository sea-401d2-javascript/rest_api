'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ArcadeSchema = new Schema({
  name: String,
  address: String,
  updated: {type: Date, default: Date.now },
  id: Schema.Types.ObjectId,
  nested: {
    games: {
      type: Schema.Types.ObjectId,
      ref: 'Games'
    }
  }

});


var Arcades = mongoose.model('Arcades', ArcadeSchema);
module.exports = Arcades;
