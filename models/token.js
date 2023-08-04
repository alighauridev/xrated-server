const mongoose = require('mongoose');
const tokenSchema = new mongoose.Schema({
    cartLink: { type: String, default: '#' },
    buyLink: { type: String, default: '#' },
    telegramLink: { type: String, default: '#' },
    pinkSale: { type: String, default: '#' },
    contractAddress: { type: String, default: '0x000000000000000000000' },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token