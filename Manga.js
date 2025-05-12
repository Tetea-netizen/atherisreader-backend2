// Manga schema
const mongoose = require('mongoose');
const MangaSchema = new mongoose.Schema({ title: String, cover: String, chapters: Array });
module.exports = mongoose.model('Manga', MangaSchema);