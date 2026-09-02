const express = require('express');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const CartItem = require('../models/CartItem');
const Order = require('../models/Order');
const Coupon = require('../models/Coupon');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const getRazorpay = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret || keyId.includes('xxxxx')) return null;
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
};

const calcTotals = async (cartItems, couponCode) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  let discount = 0;
  let appliedCode = '';

  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode.toUpperCase().trim() });
    if (coupon) {
      discount = coupon.calculateDiscount(subtotal);
      if (discount > 0) appliedCode = coupon.code;
    }
  }

  return { subtotal, discount, total: subtotal - discount, couponCode: appliedCode };
};

const createOrder = async (req, cartItems, opts) => {
  const { deliveryType, shipping, paymentMethod, paymentStatus, couponCode } = opts;
  const { subtotal, discount, total, couponCode: applied } = await calcTotals(cartItems, couponCode);

  return Order.create({
    user: req.user._id,
    items: cartItems.map((item) => ({
      productId: item.product?.toString(),
      name: item.name,
      price: item.price,
      img: item.img,
      quantity: item.quantity,
    })),
    deliveryType: deliveryType || 'home',
    shipping,
    subtotal,
    discount,
    couponCode: applied,
    total,
    paymentMethod,
    paymentStatus,
    status: 'Ordered',
  });
};

// COD checkout — works even without Razorpay keys
router.post('/create-checkout-session', authenticate, async (req, res) => {
  try {
    const { deliveryType, shipping, couponCode } = req.body;
    const cartItems = await CartItem.find({ user: req.user._id });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const { subtotal, discount } = await calcTotals(cartItems, couponCode);

    const order = await createOrder(req, cartItems, {
      deliveryType,
      shipping,
      paymentMethod: 'cod',
      paymentStatus: 'pending',
      couponCode,
    });

    await CartItem.deleteMany({ user: req.user._id });

    return res.json({
      mode: 'cod',
      orderId: order._id.toString(),
      subtotal,
      discount,
      total: order.total,
    });
  } catch (error) {
    console.error('COD checkout error:', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

// Create Razorpay order for online payment
router.post('/create-razorpay-order', authenticate, async (req, res) => {
  try {
    const razorpay = getRazorpay();
    if (!razorpay) {
      return res.status(503).json({ message: 'Online payments are not configured. Please use Cash on Delivery.' });
    }

    const { deliveryType, shipping, couponCode } = req.body;
    const cartItems = await CartItem.find({ user: req.user._id });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const { subtotal, discount, total } = await calcTotals(cartItems, couponCode);

    const pendingOrder = await createOrder(req, cartItems, {
      deliveryType,
      shipping,
      paymentMethod: 'razorpay',
      paymentStatus: 'pending',
      couponCode,
    });

    // Razorpay expects amount in paise (1 INR = 100 paise)
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: 'INR',
      receipt: pendingOrder._id.toString(),
      notes: {
        orderId: pendingOrder._id.toString(),
        userId: req.user._id.toString(),
      },
    });

    pendingOrder.razorpayOrderId = razorpayOrder.id;
    await pendingOrder.save();

    res.json({
      orderId: pendingOrder._id.toString(),
      razorpayOrderId: razorpayOrder.id,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      subtotal,
      discount,
      total,
    });
  } catch (error) {
    console.error('Razorpay order error:', error);
    res.status(500).json({ message: 'Failed to initiate payment' });
  }
});

// Verify Razorpay payment signature and confirm order
router.post('/verify-razorpay', authenticate, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing payment details' });
    }

    // HMAC verification using Razorpay key_secret
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed — signature mismatch' });
    }

    const order = await Order.findById(orderId);
    if (!order || order.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.paymentStatus = 'paid';
    order.razorpayPaymentId = razorpay_payment_id;
    await order.save();

    await CartItem.deleteMany({ user: req.user._id });

    res.json({ paid: true, orderId: order._id.toString() });
  } catch (error) {
    console.error('Razorpay verify error:', error);
    res.status(500).json({ message: 'Failed to verify payment' });
  }
});

module.exports = router;
