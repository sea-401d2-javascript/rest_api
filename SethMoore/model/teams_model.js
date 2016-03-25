'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamsSchema = new mongoose.Schema({
  name: String,
  active: Boolean,
  region: String,
  current_members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player'
    }
  ]
  // past_members: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Player'
  //   }
  // ],
});

module.exports = mongoose.model('Team', teamsSchema);

// '{"name": "Evil Geniuses", "active": true, "region": "NA"}'
