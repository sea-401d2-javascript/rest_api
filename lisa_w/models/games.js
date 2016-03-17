'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let GamesSchema = new Schema({
  title: String,
  genre: String,
  year: Number,
  id: Schema.Types.ObjectId,
  updated: {type: Date, default: Date.now},
  players: Number

});




let Game = mongoose.model('Game', GamesSchema);
module.exports = Game;
