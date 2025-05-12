// Wallet model
const mongoose = require('mongoose');
const WalletSchema = new mongoose.Schema({ userId: String, balance: Number, transactions: Array });
module.exports = mongoose.model('Wallet', WalletSchema);