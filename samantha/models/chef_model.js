const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chefSchema = new mongoose.Schema({
  name:         String,
  funFact:      String,
  recipes:      [{type: Schema.Types.ObjectId, ref: 'Recipes'}]
});

module.exports = mongoose.model('Chefs', chefSchema);
