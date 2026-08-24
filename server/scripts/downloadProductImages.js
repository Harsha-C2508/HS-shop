#!/usr/bin/env node
/** Downloads product images into public/products/ for local serving */
const fs = require('fs');
const path = require('path');
const https = require('https');
const { LEGACY_PHOTO, getSourceUrl } = require('../src/data/productImages');

const OUT_DIR = path.join(__dirname, '../../public/products');

const download = (url, dest) =>
  new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          fs.unlinkSync(dest);
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      })
      .on('error', reject);
  });

const run = async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let ok = 0;
  let fail = 0;

  for (const legacyId of Object.keys(LEGACY_PHOTO)) {
    const url = getSourceUrl(Number(legacyId));
    const dest = path.join(OUT_DIR, `${legacyId}.jpg`);
    try {
      await download(url, dest);
      ok += 1;
      console.log(`✓ ${legacyId}.jpg`);
    } catch (error) {
      fail += 1;
      console.warn(`✗ ${legacyId}: ${error.message}`);
    }
  }

  console.log(`Done: ${ok} downloaded, ${fail} failed → ${OUT_DIR}`);
};

run();
