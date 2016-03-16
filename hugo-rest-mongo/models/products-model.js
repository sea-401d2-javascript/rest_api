'user strict';

const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: String,
  upc: String,
  category: String,
  stock: Number,
  udpated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', productSchema);
