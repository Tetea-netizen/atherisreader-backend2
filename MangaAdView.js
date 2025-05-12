// Stealth ad view tracker
const mongoose = require('mongoose');
const ViewSchema = new mongoose.Schema({ mangaId: String, chapterId: String, userId: String, timestamp: Date });
module.exports = mongoose.model('MangaAdView', ViewSchema);