'use strict';
module.exports = (mongoose, db) => {
  let ideaSchema = mongoose.Schema({
    sector: String,
    teamSize: {type: Number, default: 2},
    lang: String
  });
  let Idea = mongoose.model('Idea', ideaSchema);
  db.Idea = Idea;
};
