'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GamesSchema = new Schema({
  name: String,
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: 'games'
    }
  ]

});


var Games = mongoose.model('Games', GamesSchema);
module.exports = Games;
