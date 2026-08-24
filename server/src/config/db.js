const mongoose = require('mongoose');

let memoryServer = null;

const LOCAL_URI = 'mongodb://127.0.0.1:27017/hsshop';

const maskUri = (uri) => {
  if (!uri || !uri.includes('://')) return uri;
  if (uri.startsWith('mongodb+srv://')) {
    return uri.replace(/\/\/([^:@/]+):([^@/]+)@/, '//$1:***@');
  }
  return uri.replace(/\/\/([^:@/]+):([^@/]+)@/, '//$1:***@');
};

const connectWithMemoryDb = async () => {
  const { MongoMemoryServer } = require('mongodb-memory-server');
  memoryServer = await MongoMemoryServer.create();
  const uri = memoryServer.getUri();
  await mongoose.connect(uri);
  console.log('MongoDB connected (in-memory — data resets when server stops)');
};

const buildConnectionAttempts = () => {
  const attempts = [];
  const primary = process.env.MONGODB_URI?.trim();
  if (primary) attempts.push({ uri: primary, label: 'configured' });
  if (!primary || primary !== LOCAL_URI) {
    attempts.push({ uri: LOCAL_URI, label: 'local Docker/default' });
  }
  return attempts;
};

const connectDB = async () => {
  if (process.env.USE_MEMORY_DB === 'true') {
    return connectWithMemoryDb();
  }

  const attempts = buildConnectionAttempts();
  const errors = [];

  for (const { uri, label } of attempts) {
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
      const suffix = uri === LOCAL_URI ? ' (local — data persists)' : '';
      console.log(`MongoDB connected${suffix}`);
      return;
    } catch (error) {
      errors.push({ label, uri: maskUri(uri), message: error.message });
      if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect().catch(() => {});
      }
    }
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error(errors.map((e) => `${e.label}: ${e.message}`).join('; '));
  }

  for (const e of errors) {
    console.warn(`Could not reach MongoDB (${e.label}, ${e.uri}): ${e.message}`);
  }
  console.warn('');
  console.warn('Persistent database not available. Using in-memory MongoDB for this session.');
  console.warn('Fix (choose one):');
  console.warn('  • Atlas: MongoDB Atlas → Network Access → Add Current IP Address, restart API');
  console.warn('  • Local: install Docker, then from repo root: npm run db:up — restart API');
  console.warn('');

  await connectWithMemoryDb();
};

module.exports = connectDB;
