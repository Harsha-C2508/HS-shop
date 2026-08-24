require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { ensureSeeded } = require('./seed');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/coupons', require('./routes/coupons'));
app.use('/api', require('./routes/reviews'));
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wish', wishlistRoutes);
app.use('/api', orderRoutes);
app.use('/api/images', require('./routes/images'));
app.use('/api', productRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

const start = async () => {
  await connectDB();
  await ensureSeeded();
  app.listen(PORT, () => {
    console.log(`HS-shop API running on http://localhost:${PORT}`);
  });
};

start().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
