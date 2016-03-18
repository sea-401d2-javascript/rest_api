const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name:         String,
  cookTime:     String,
  ingredients:  [{item:String, amount:String}]
});

module.exports = mongoose.model('Recipes', recipeSchema);
