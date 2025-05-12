// Product schema
const mongoose = require('mongoose');
const ShopProductSchema = new mongoose.Schema({ title: String, image: String, coinPrice: Number, amazonLink: String });
module.exports = mongoose.model('ShopProduct', ShopProductSchema);