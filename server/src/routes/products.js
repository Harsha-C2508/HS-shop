const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

const CATEGORY_MAP = {
  home: 'home',
  mensMeterial: 'mens',
  women: 'womens',
  painting: 'painting',
  accessories: 'accessories',
  footwear: 'footwear',
  homeDecor: 'homeDecor',
};

const parseSortParams = (query) => {
  const sortBy = query._sort || query.sortBy;
  const order = query._order || query.order;
  if (sortBy === 'price' && order) {
    return { price: order === 'desc' ? -1 : 1 };
  }
  return { legacyId: 1, createdAt: 1 };
};

const buildFilter = (categoryKey, query) => {
  const category = CATEGORY_MAP[categoryKey] || categoryKey;
  const filter = { category };

  const cats = query.cat || query['cat[]'];
  if (cats) {
    const catList = Array.isArray(cats) ? cats : [cats];
    if (catList.length > 0) {
      filter.cat = { $in: catList };
    }
  }

  if (query.q) {
    filter.$or = [
      { name: { $regex: query.q, $options: 'i' } },
      { cat: { $regex: query.q, $options: 'i' } },
      { dis: { $regex: query.q, $options: 'i' } },
    ];
  }

  return filter;
};

const findProducts = async (categoryKey, query) => {
  const filter = buildFilter(categoryKey, query);
  const sort = parseSortParams(query);
  const products = await Product.find(filter).sort(sort);
  return products.map((p) => p.toLegacy());
};

const findProductById = async (idParam) => {
  if (mongoose.Types.ObjectId.isValid(idParam)) {
    const byId = await Product.findById(idParam);
    if (byId) return byId;
  }
  return Product.findOne({
    $or: [{ legacyId: Number(idParam) }, { legacyId: idParam }],
  });
};

const findProductByParam = async (categoryKey, idParam) => {
  const category = CATEGORY_MAP[categoryKey] || categoryKey;
  let product = null;

  if (mongoose.Types.ObjectId.isValid(idParam)) {
    product = await Product.findOne({ _id: idParam, category });
  }
  if (!product) {
    product = await Product.findOne({ legacyId: Number(idParam), category });
  }
  if (!product) {
    product = await Product.findOne({ legacyId: idParam, category });
  }

  return product;
};

router.get('/admin/products', authenticate, requireAdmin, async (_req, res) => {
  try {
    const products = await Product.find().sort({ category: 1, createdAt: -1 });
    const stats = {
      total: products.length,
      home: products.filter((p) => p.category === 'home').length,
      mens: products.filter((p) => p.category === 'mens').length,
      womens: products.filter((p) => p.category === 'womens').length,
      painting: products.filter((p) => p.category === 'painting').length,
      accessories: products.filter((p) => p.category === 'accessories').length,
      footwear: products.filter((p) => p.category === 'footwear').length,
      homeDecor: products.filter((p) => p.category === 'homeDecor').length,
    };
    res.json({ products: products.map((p) => p.toLegacy()), stats });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch admin products' });
  }
});

router.get('/admin/stats', authenticate, requireAdmin, async (_req, res) => {
  try {
    const [productCount, orderCount, pendingOrders] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ status: 'Ordered' }),
    ]);
    res.json({ productCount, orderCount, pendingOrders });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

router.get('/product/:id', async (req, res) => {
  try {
    const product = await findProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product.toLegacy());
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const q = req.query.q || '';
    if (!q.trim()) {
      return res.json([]);
    }
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { cat: { $regex: q, $options: 'i' } },
        { dis: { $regex: q, $options: 'i' } },
      ],
    }).limit(40);
    res.json(products.map((p) => p.toLegacy()));
  } catch (error) {
    res.status(500).json({ message: 'Search failed' });
  }
});

const registerListRoute = (path, categoryKey) => {
  router.get(path, async (req, res) => {
    try {
      const products = await findProducts(categoryKey, req.query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products' });
    }
  });
};

const registerDetailRoute = (path, categoryKey) => {
  router.get(`${path}/:id`, async (req, res) => {
    try {
      const product = await findProductByParam(categoryKey, req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product.toLegacy());
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch product' });
    }
  });
};

registerListRoute('/home', 'home');
registerDetailRoute('/home', 'home');

registerListRoute('/mensMeterial', 'mens');
registerDetailRoute('/mensMeterial', 'mens');

registerListRoute('/women', 'womens');
registerDetailRoute('/women', 'womens');

registerListRoute('/painting', 'painting');
registerDetailRoute('/painting', 'painting');

registerListRoute('/accessories', 'accessories');
registerDetailRoute('/accessories', 'accessories');

registerListRoute('/footwear', 'footwear');
registerDetailRoute('/footwear', 'footwear');

registerListRoute('/homeDecor', 'homeDecor');
registerDetailRoute('/homeDecor', 'homeDecor');

router.post('/home', authenticate, requireAdmin, async (req, res) => {
  try {
    const category = req.body.category || 'home';
    const last = await Product.findOne({ category }).sort({ legacyId: -1 });
    const legacyId = last?.legacyId ? last.legacyId + 1 : 1;
    const product = await Product.create({
      ...req.body,
      category,
      legacyId,
      price: Number(req.body.price),
      offer: Number(req.body.offer) || 0,
      star: Number(req.body.star) || 0,
    });
    res.status(201).json(product.toLegacy());
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product' });
  }
});

router.patch('/home/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const product = await findProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { img, price, offer, star, name, dis, cat } = req.body;
    if (img !== undefined) product.img = img;
    if (price !== undefined) product.price = Number(price);
    if (offer !== undefined) product.offer = Number(offer);
    if (star !== undefined) product.star = Number(star);
    if (name !== undefined) product.name = name;
    if (dis !== undefined) product.dis = dis;
    if (cat !== undefined) product.cat = cat;

    await product.save();
    res.json(product.toLegacy());
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product' });
  }
});

router.delete('/admin/products/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const product = await findProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;
