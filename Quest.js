// Quest schema
const mongoose = require('mongoose');
const QuestSchema = new mongoose.Schema({ title: String, reward: Number });
module.exports = mongoose.model('Quest', QuestSchema);