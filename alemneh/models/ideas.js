'use strict';
module.exports = (mongoose, db) => {
  let ideaSchema = mongoose.Schema({
    _owner: [{type: String, ref: 'Student'}],
    sector: String,
    teamSize: {type: Number, default: 2},
    lang: String
  });
  let Idea = mongoose.model('Idea', ideaSchema);
  db.Idea = Idea;
};
