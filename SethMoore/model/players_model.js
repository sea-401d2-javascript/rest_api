'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playersSchema = new mongoose.Schema({
  name: String,
  alias: String,
  position: Number,
  country: String,
  current_team: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    }
  ]
  // past_teams: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Team'
  //   }
  // ]
});

module.exports = mongoose.model('Player', playersSchema);

// '{"name": "Peter", "alias": "PPD", "position": 5, "country": "USA", "current_team": ["56eb01606d6f53e5c63b5a11"]}'
