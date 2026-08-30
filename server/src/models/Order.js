const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        img: String,
        quantity: { type: Number, default: 1 },
      },
    ],
    deliveryType: { type: String, enum: ['home', 'shop'], required: true },
    shipping: {
      name: String,
      mobile: String,
      pincode: String,
      city: String,
      state: String,
      buildingNo: String,
      street: String,
      landmark: String,
    },
    total: { type: Number, required: true },
    subtotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    couponCode: { type: String, default: '' },
    status: { type: String, default: 'Ordered' },
    paymentMethod: { type: String, enum: ['stripe', 'cod', 'razorpay'], default: 'cod' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    stripeSessionId: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
