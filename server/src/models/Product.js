const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    legacyId: { type: Number, index: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    offer: { type: Number, default: 0 },
    star: { type: Number, default: 0 },
    img: { type: String, required: true },
    cat: { type: String, default: '' },
    dis: { type: String, default: '' },
    category: {
      type: String,
      enum: ['home', 'mens', 'womens', 'painting', 'accessories', 'footwear', 'homeDecor'],
      required: true,
      index: true,
    },
    brand: { type: String, default: '' },
    highlights: [String],
    specs: { type: mongoose.Schema.Types.Mixed, default: {} },
    sizes: [String],
    colors: [{ name: String, hex: String }],
    material: { type: String, default: '' },
    warranty: { type: String, default: null },
    returnPolicy: { type: String, default: '10 days easy return' },
    seller: { type: String, default: "Harsha's Collection" },
  },
  { timestamps: true }
);

productSchema.methods.toLegacy = function toLegacy() {
  return {
    id: this.legacyId ?? this._id.toString(),
    _id: this._id.toString(),
    name: this.name,
    price: this.price,
    offer: this.offer,
    star: this.star,
    img: this.img,
    cat: this.cat,
    dis: this.dis,
    category: this.category,
    brand: this.brand || '',
    highlights: this.highlights || [],
    specs: this.specs || {},
    sizes: this.sizes || [],
    colors: this.colors || [],
    material: this.material || '',
    warranty: this.warranty || null,
    returnPolicy: this.returnPolicy || '10 days easy return',
    seller: this.seller || "Harsha's Collection",
  };
};

module.exports = mongoose.model('Product', productSchema);
