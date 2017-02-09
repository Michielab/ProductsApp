const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Review = require('./review');

const ProductSchema = new Schema({
  name       : String,
  price      : Number,
  imageUrl   : String,
  description: String,
  reviews    : [Review.schema]
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
