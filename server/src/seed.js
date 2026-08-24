require('dotenv').config();
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const ProductImage = require('./models/ProductImage');
const Coupon = require('./models/Coupon');

const CATALOG = require('./data/catalog');
const { LEGACY_PHOTO } = require('./data/productImages');

const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || 'admin@hsshop.com';
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    if (existing.role !== 'admin') {
      existing.role = 'admin';
      await existing.save();
    }
    return;
  }

  await User.create({
    name: 'Store Admin',
    email,
    password,
    role: 'admin',
  });
  console.log(`Admin user created: ${email}`);
};

const seedCatalog = async () => {
  let added = 0;
  let updated = 0;

  const catalogLegacyIds = new Set(CATALOG.map((p) => p.legacyId));

  for (const product of CATALOG) {
    const payload = { ...product };
    const existing = await Product.findOne({
      $or: [{ legacyId: product.legacyId }, { name: product.name, category: product.category }],
    });
    if (existing) {
      Object.assign(existing, payload);
      await existing.save();
      updated += 1;
    } else {
      await Product.create(payload);
      added += 1;
    }
  }

  // Remove old/stale products that aren't in the current catalog
  const stale = await Product.find({ legacyId: { $nin: [...catalogLegacyIds] } });
  if (stale.length > 0) {
    const ids = stale.map((p) => p._id);
    await Product.deleteMany({ _id: { $in: ids } });
    console.log(`Cleaned up ${stale.length} old products not in current catalog`);
  }

  if (added > 0 || updated > 0) {
    console.log(`Catalog: ${added} added, ${updated} updated (${CATALOG.length} in catalog)`);
  }
};

const seedCoupons = async () => {
  const coupons = [
    { code: 'WELCOME10', type: 'percent', value: 10, minOrder: 500, maxDiscount: 500 },
    { code: 'FLAT200', type: 'flat', value: 200, minOrder: 1500 },
    { code: 'HSVIP15', type: 'percent', value: 15, minOrder: 2000, maxDiscount: 800 },
  ];

  for (const c of coupons) {
    await Coupon.findOneAndUpdate({ code: c.code }, c, { upsert: true });
  }
};

const seedImages = async () => {
  const imgDir = path.join(__dirname, '../../public/products');
  if (!fs.existsSync(imgDir)) {
    console.log('No local product images found — skipping image seed');
    return;
  }

  const existing = await ProductImage.countDocuments();
  const expected = Object.keys(LEGACY_PHOTO).length;
  if (existing >= expected) return;

  let added = 0;
  for (const legacyId of Object.keys(LEGACY_PHOTO)) {
    const filename = `${legacyId}.jpg`;
    const filePath = path.join(imgDir, filename);

    if (!fs.existsSync(filePath)) continue;

    const alreadyStored = await ProductImage.findOne({ filename });
    if (alreadyStored) continue;

    const data = fs.readFileSync(filePath);
    await ProductImage.create({ filename, data, contentType: 'image/jpeg' });
    added += 1;
  }

  if (added > 0) console.log(`Images: ${added} product images stored in database`);
};

/** Seed catalog when DB is empty or missing categories — safe to call on every server start */
const ensureSeeded = async () => {
  const count = await Product.countDocuments();

  await seedAdmin();
  await seedCoupons();
  await seedImages();

  if (count === 0) {
    console.log('No products in database — seeding catalog...');
    await seedCatalog();
    const total = await Product.countDocuments();
    console.log(`Store ready with ${total} products`);
    return;
  }

  // Keep catalog in sync (upsert images, new items)
  await seedCatalog();
};

const run = async () => {
  await connectDB();
  await ensureSeeded();
  console.log('Seed complete');
  process.exit(0);
};

if (require.main === module) {
  run().catch((error) => {
    console.error('Seed failed:', error.message);
    process.exit(1);
  });
}

module.exports = { ensureSeeded, seedCatalog, seedAdmin, seedCoupons, seedImages };
