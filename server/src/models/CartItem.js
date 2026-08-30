const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    price: Number,
    offer: Number,
    star: Number,
    img: String,
    cat: String,
    dis: String,
    quantity: { type: Number, default: 1, min: 1 },
  },
  { timestamps: true }
);

cartItemSchema.index({ user: 1, product: 1 }, { unique: true });

cartItemSchema.methods.toLegacy = function toLegacy() {
  return {
    id: this._id.toString(),
    productId: this.product?.toString(),
    name: this.name,
    price: this.price,
    offer: this.offer,
    star: this.star,
    img: this.img,
    cat: this.cat,
    dis: this.dis,
    quantity: this.quantity,
  };
};

module.exports = mongoose.model('CartItem', cartItemSchema);
