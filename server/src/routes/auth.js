const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const signToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
    return true;
  }
  return false;
};

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').trim().notEmpty().withMessage('Name is required'),
  ],
  async (req, res) => {
    if (handleValidation(req, res)) return;

    const { email, password, name, number } = req.body;
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await User.create({
      email,
      password,
      name,
      phone: number || '',
      role: 'user',
    });

    const token = signToken(user._id);
    return res.status(201).json({ token, user: user.toSafeObject() });
  }
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    if (handleValidation(req, res)) return;

    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user._id);
    return res.json({ token, user: user.toSafeObject() });
  }
);

router.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user.toSafeObject() });
});

router.put('/address', authenticate, async (req, res) => {
  try {
    const user = req.user;
    const addr = req.body;

    if (!addr.name || !addr.mobile || !addr.pincode || !addr.city || !addr.state) {
      return res.status(400).json({ message: 'Name, mobile, pincode, city, and state are required' });
    }

    // Clear old defaults and set the new one
    user.addresses.forEach((a) => { a.isDefault = false; });

    const existing = user.addresses.find(
      (a) => a.pincode === addr.pincode && a.mobile === addr.mobile && a.name === addr.name
    );

    if (existing) {
      Object.assign(existing, addr, { isDefault: true });
    } else {
      user.addresses.push({ ...addr, isDefault: true });
    }

    await user.save();
    res.json({ user: user.toSafeObject() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save address' });
  }
});

router.post('/logout', (_req, res) => {
  res.json({ message: 'Logged out' });
});

module.exports = router;
