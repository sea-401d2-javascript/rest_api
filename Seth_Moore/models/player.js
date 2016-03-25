'use strict';

module.exports = function(mongoose, models) {
  const playersSchema = new mongoose.Schema({
    name: String,
    alias: String,
    position: Number,
    country: String,
    current_team: String
  });

  let Player = mongoose.model('Player', playersSchema);
  models.Player = Player;
}
