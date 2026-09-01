const express = require('express');
const mongoose = require('mongoose');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

const resolveProduct = async (payload) => {
  if (payload.productId && mongoose.Types.ObjectId.isValid(payload.productId)) {
    return Product.findById(payload.productId);
  }
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
    const items = await CartItem.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(items.map((item) => item.toLegacy()));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = await resolveProduct(req.body);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const legacy = product.toLegacy();
    let item = await CartItem.findOne({ user: req.user._id, product: product._id });

    if (item) {
      item.quantity += 1;
      await item.save();
    } else {
      item = await CartItem.create({
        user: req.user._id,
        product: product._id,
        name: legacy.name,
        price: legacy.price,
        offer: legacy.offer,
        star: legacy.star,
        img: legacy.img,
        cat: legacy.cat,
        dis: legacy.dis,
      });
    }

    res.status(201).json(item.toLegacy());
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to cart' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const item = await CartItem.findOne({ _id: req.params.id, user: req.user._id });
    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    if (quantity <= 0) {
      await item.deleteOne();
    } else {
      item.quantity = quantity;
      await item.save();
    }

    const items = await CartItem.find({ user: req.user._id });
    res.json(items.map((i) => i.toLegacy()));
  } catch (error) {
    res.status(500).json({ message: 'Failed to update cart' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await CartItem.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    const items = await CartItem.find({ user: req.user._id });
    res.json(items.map((item) => item.toLegacy()));
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove cart item' });
  }
});

module.exports = router;
