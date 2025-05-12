// Novel schema
const mongoose = require('mongoose');
const NovelSchema = new mongoose.Schema({ title: String, genre: String, chapters: Array });
module.exports = mongoose.model('Novel', NovelSchema);