const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    offer: Number,
    star: Number,
    img: String,
    cat: String,
    dis: String,
    category: String,
  },
  { timestamps: true }
);

wishlistItemSchema.methods.toLegacy = function toLegacy() {
  return {
    id: this._id.toString(),
    productId: this.product?.toString() || this._id.toString(),
    name: this.name,
    price: this.price,
    offer: this.offer,
    star: this.star,
    img: this.img,
    cat: this.cat,
    dis: this.dis,
    category: this.category || 'home',
  };
};

module.exports = mongoose.model('WishlistItem', wishlistItemSchema);
