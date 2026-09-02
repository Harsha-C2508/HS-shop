const express = require('express');
const mongoose = require('mongoose');
const WishlistItem = require('../models/WishlistItem');
const Product = require('../models/Product');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

const resolveProduct = async (payload) => {
  if (payload._id && mongoose.Types.ObjectId.isValid(payload._id)) {
    return Product.findById(payload._id);
  }
  if (payload.id) {
    if (mongoose.Types.ObjectId.isValid(payload.id)) {
      const byObjectId = await Product.findById(payload.id);
      if (byObjectId) return byObjectId;
    }
    return Product.findOne({
      $or: [{ legacyId: Number(payload.id) }, { legacyId: payload.id }],
    });
  }
  return null;
};

router.get('/', async (req, res) => {
  try {
    const items = await WishlistItem.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(items.map((item) => item.toLegacy()));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch wishlist' });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = await resolveProduct(req.body);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const legacy = product.toLegacy();
    const existing = await WishlistItem.findOne({ user: req.user._id, product: product._id });
    if (existing) {
      return res.status(200).json(existing.toLegacy());
    }

    const item = await WishlistItem.create({
      user: req.user._id,
      product: product._id,
      name: legacy.name,
      price: legacy.price,
      offer: legacy.offer,
      star: legacy.star,
      img: legacy.img,
      cat: legacy.cat,
      dis: legacy.dis,
      category: legacy.category || 'home',
    });

    res.status(201).json(item.toLegacy());
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to wishlist' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await WishlistItem.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    const items = await WishlistItem.find({ user: req.user._id });
    res.json(items.map((item) => item.toLegacy()));
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove wishlist item' });
  }
});

module.exports = router;
