const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    type: { type: String, enum: ['percent', 'flat'], required: true },
    value: { type: Number, required: true, min: 0 },
    minOrder: { type: Number, default: 0 },
    maxDiscount: { type: Number, default: null },
    active: { type: Boolean, default: true },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

couponSchema.methods.calculateDiscount = function calculateDiscount(subtotal) {
  if (!this.active) return 0;
  if (this.expiresAt && this.expiresAt < new Date()) return 0;
  if (subtotal < this.minOrder) return 0;

  let discount = this.type === 'percent' ? (subtotal * this.value) / 100 : this.value;
  if (this.maxDiscount && discount > this.maxDiscount) {
    discount = this.maxDiscount;
  }
  return Math.min(discount, subtotal);
};

module.exports = mongoose.model('Coupon', couponSchema);
