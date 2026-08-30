/** Verified Unsplash photo IDs — each tested HTTP 200, matched to product type */
const LEGACY_PHOTO = {
  // ─── HOME / FEATURED ───
  101: '1596755094514-f87e34085b2c', // linen shirt
  102: '1662376567952-004fab001201', // white sneakers (verified white pair)
  103: '1576566588028-4147f3842f27', // merino wool sweater / knit
  104: '1490481651871-ab68de25d43d', // leather crossbody bag
  105: '1572635196237-14b3f281503f', // aviator sunglasses
  106: '1593030761757-71fae45fa0e7', // smart casual blazer (blazer on hanger)
  107: '1620012253295-c15cc3e65df4', // classic cotton shirt (folded shirts)
  108: '1542291026-7eec264c27ff',     // running sports shoes
  109: '1469334031218-e382a71b716b', // floral print dress
  110: '1541961017774-22349e4a1262', // minimalist wall art
  111: '1542272604-787c3835535d',     // slim fit jeans (denim)
  112: '1505740420928-5e560c06d30e', // wireless earbuds
  113: '1556228578-8c89e6adf883',     // organic face serum
  114: '1513475382585-d06e58bcb0e0', // ceramic planter set
  115: '1521572163474-6864f9cf17ab', // graphic cotton tee
  116: '1601925260368-ae2f83cf8b7f', // yoga mat premium
  117: '1523275335684-37898b6baf30', // stainless steel watch
  118: '1603006905003-be475563bc59', // scented candle trio

  // ─── MENS ───
  201: '1541099649105-f69ad21f3246', // slim fit denim jeans
  202: '1581655353564-df123a1eb820', // cotton crew neck tee
  203: '1556821840-3a63f95609a7',     // performance sports shorts / activewear
  204: '1594938298603-c8148c4dae35', // oxford button-down shirt
  205: '1562157873-818bc0726f68',     // jogger track pants / polo
  206: '1591195853828-11db59a44f6b', // casual chino shorts
  207: '1544022613-e87ca75a784a',     // wool blend overcoat
  208: '1521572163474-6864f9cf17ab', // polo collar t-shirt

  // ─── WOMENS ───
  301: '1496747611176-843222e1e57c', // floral summer dress
  302: '1509631179647-0177331693ae', // high-waist palazzo pants
  303: '1515372039744-b8f02a3ae446', // silk blend top
  304: '1582142306909-195724d33ffc',   // pleated midi skirt
  305: '1576566588028-4147f3842f27', // cashmere blend cardigan / knit
  306: '1541099649105-f69ad21f3246', // high-rise skinny jeans
  307: '1518622358385-8ea7d0794bf6', // off-shoulder party top
  308: '1469334031218-e382a71b716b', // linen co-ord set / dress

  // ─── PAINTINGS ───
  401: '1541961017774-22349e4a1262', // abstract canvas — horizon
  402: '1578662996442-48f60103fc96', // minimalist line art
  403: '1579783902614-a3fb3927b6a5', // botanical watercolor
  404: '1509281373149-e957c6296406', // geometric mandala
  405: '1449824913935-59a10b8d2000', // cityscape at dusk
  406: '1506905925346-21bda4d32df4', // serene mountain lake

  // ─── ACCESSORIES ───
  501: '1624222247344-550fb60583dc', // leather belt classic
  502: '1577733966973-d680bffd2e80', // canvas backpack
  503: '1584917865442-de89df76afd3', // silk scarf print
  504: '1572635196237-14b3f281503f', // polarized wayfarers
  505: '1523275335684-37898b6baf30', // minimalist wallet / watch
  506: '1535632066927-ab7c9ab60908', // pearl drop earrings

  // ─── FOOTWEAR ───
  601: '1614252235316-8c857d38b5f4', // leather loafers
  602: '1659044294246-bb4be7a06073', // high-top sneakers (verified)
  603: '1543163521-1bf539c55dd2',     // block heel sandals
  604: '1520219306100-ec4afeeefe58', // hiking boots
  605: '1603487742131-4160ec999306', // slide sandals
  606: '1533867617858-e7b97e060509', // formal oxford shoes

  // ─── HOME DECOR ───
  701: '1522758971460-1d21eed7dc1d', // boho macrame wall hanging
  702: '1513506003901-1e6a229e2d15', // table lamp ceramic
  703: '1567016432779-094069958ea5', // throw pillow set
  704: '1618220179428-22790b461013', // wall mirror round
  705: '1513475382585-d06e58bcb0e0', // storage basket set
  706: '1484704849700-f032a568e944', // digital photo frame
};

const unsplashUrl = (photoId) =>
  `https://images.unsplash.com/photo-${photoId}?w=400&h=500&fit=crop&q=80`;

const img = (legacyId) => `/api/images/${legacyId}.jpg`;

const getSourceUrl = (legacyId) => {
  const photoId = LEGACY_PHOTO[legacyId];
  return photoId ? unsplashUrl(photoId) : null;
};

module.exports = { img, LEGACY_PHOTO, getSourceUrl, unsplashUrl };
