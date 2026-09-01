const express = require('express');
const multer = require('multer');
const ProductImage = require('../models/ProductImage');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/:filename', async (req, res) => {
  try {
    const image = await ProductImage.findOne({ filename: req.params.filename });
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.set('Content-Type', image.contentType);
    res.set('Cache-Control', 'public, max-age=86400');
    res.send(image.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch image' });
  }
});

router.post('/upload', authenticate, requireAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const filename = req.body.filename || `${Date.now()}-${req.file.originalname}`;

    const image = await ProductImage.findOneAndUpdate(
      { filename },
      { data: req.file.buffer, contentType: req.file.mimetype, filename },
      { upsert: true, new: true }
    );

    res.status(201).json({ filename: image.filename, url: `/api/images/${image.filename}` });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image' });
  }
});

module.exports = router;
