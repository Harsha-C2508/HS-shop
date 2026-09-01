const express = require('express');
const Coupon = require('../models/Coupon');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/validate', authenticate, async (req, res) => {
  try {
    const { code, subtotal } = req.body;
    if (!code) {
      return res.status(400).json({ message: 'Coupon code is required' });
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase().trim() });
    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code' });
    }

    const discount = coupon.calculateDiscount(Number(subtotal) || 0);
    if (discount <= 0) {
      return res.status(400).json({
        message: `Coupon not applicable. Min order ₹${coupon.minOrder} required.`,
      });
    }

    res.json({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      discount,
      finalTotal: Number(subtotal) - discount,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to validate coupon' });
  }
});

module.exports = router;
