const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Products = new Schema({
  name: String,
  image: String,
  shape: String,
  size: String,
  price: String,
  text: String,
});

module.exports = mongoose.model('Product', Products);
