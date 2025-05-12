// Ad view schema
const mongoose = require('mongoose');
const AdViewSchema = new mongoose.Schema({ userId: String, region: String, timestamp: Date });
module.exports = mongoose.model('AdView', AdViewSchema);