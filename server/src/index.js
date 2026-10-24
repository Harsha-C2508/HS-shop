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

// Connect to DB once (cached across invocations in Vercel)
const dbReady = connectDB().then(() => ensureSeeded());

app.use(cors({ credentials: true }));
app.use(express.json());

// Ensure DB is connected before any route handler runs
app.use(async (_req, _res, next) => {
  await dbReady;
  next();
});

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

// Export for Vercel serverless; also support standalone `node index.js`
module.exports = app;

if (require.main === module) {
  dbReady.then(() => {
    app.listen(PORT, () => {
      console.log(`HS-shop API running on http://localhost:${PORT}`);
    });
  });
}
