const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema({
  filename: { type: String, required: true, unique: true, index: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, default: 'image/jpeg' },
});

module.exports = mongoose.model('ProductImage', productImageSchema);
