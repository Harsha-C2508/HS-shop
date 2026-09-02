const express = require('express');
const mongoose = require('mongoose');
const Review = require('../models/Review');
const Product = require('../models/Product');
const { authenticate, optionalAuth } = require('../middleware/auth');

const router = express.Router();

const findProduct = async (id) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    const byId = await Product.findById(id);
    if (byId) return byId;
  }
  return Product.findOne({
    $or: [{ legacyId: Number(id) }, { legacyId: id }],
  });
};

router.get('/product/:id/reviews', async (req, res) => {
  try {
    const product = await findProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const reviews = await Review.find({ product: product._id })
      .sort({ createdAt: -1 })
      .limit(50);

    const stats = await Review.aggregate([
      { $match: { product: product._id } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      reviews,
      avgRating: stats[0]?.avgRating ? Number(stats[0].avgRating.toFixed(1)) : 0,
      count: stats[0]?.count || 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

router.post('/product/:id/reviews', authenticate, async (req, res) => {
  try {
    const product = await findProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { rating, comment } = req.body;
    if (!rating || rating < 1 || rating > 5 || !comment?.trim()) {
      return res.status(400).json({ message: 'Rating (1-5) and comment are required' });
    }

    const review = await Review.findOneAndUpdate(
      { product: product._id, user: req.user._id },
      {
        userName: req.user.name,
        rating: Number(rating),
        comment: comment.trim(),
      },
      { upsert: true, new: true }
    );

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit review' });
  }
});

module.exports = router;
