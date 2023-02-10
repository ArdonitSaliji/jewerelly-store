const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Products = new Schema({
  name: { type: String, unique: true },
  image: String,
  shape: String,
  size: String,
  price: String,
  inStock: String,
  text: String,
});

module.exports = mongoose.model('Product', Products);
