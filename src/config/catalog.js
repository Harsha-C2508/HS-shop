export const FILTER_OPTIONS = {
  home: [
    'Shirt', 'T-shirt', 'Jeans', 'Shorts', 'Sports Shorts', 'Joggers',
    'Sweaters', 'Top', 'Skirts', 'Palazzo Pants', 'Dress', 'Formal',
    'Footwear', 'Accessories', 'Home Decor', 'Electronics', 'Beauty', 'Sports', 'painting',
  ],
  mens: ['T-shirt', 'Shorts', 'Sports Shorts', 'Shirt', 'Joggers', 'Jeans', 'Formal'],
  womens: ['Top', 'Skirts', 'Sweaters', 'Jeans', 'Palazzo Pants', 'Dress'],
  painting: ['painting'],
  accessories: ['Accessories'],
  footwear: ['Footwear'],
  homeDecor: ['Home Decor', 'Electronics'],
};

export const SHOP_CATEGORIES = [
  { label: 'Mens', path: '/mens', emoji: '👔', desc: 'Shirts, jeans & activewear' },
  { label: 'Womens', path: '/womens', emoji: '👗', desc: 'Dresses, tops & co-ords' },
  { label: 'Paintings', path: '/paintings', emoji: '🎨', desc: 'Original art & canvas' },
  { label: 'Footwear', path: '/footwear', emoji: '👟', desc: 'Sneakers, boots & sandals' },
  { label: 'Accessories', path: '/accessories', emoji: '👜', desc: 'Bags, watches & jewelry' },
  { label: 'Home Decor', path: '/homeDecor', emoji: '🏠', desc: 'Lamps, art & living essentials' },
];

export const CATEGORY_CONFIG = {
  home: {
    label: 'Home',
    apiPath: '/home',
    basePath: '/home',
    fetchKey: 'getHomeData',
    stateKey: 'home',
  },
  mens: {
    label: 'Mens',
    apiPath: '/mensMeterial',
    basePath: '/mens',
    fetchKey: 'getMensData',
    stateKey: 'mens',
  },
  womens: {
    label: 'Womens',
    apiPath: '/women',
    basePath: '/womens',
    fetchKey: 'getWomensData',
    stateKey: 'womens',
  },
  painting: {
    label: 'Paintings',
    apiPath: '/painting',
    basePath: '/paintings',
    fetchKey: 'getPaintingData',
    stateKey: 'painting',
  },
  accessories: {
    label: 'Accessories',
    apiPath: '/accessories',
    basePath: '/accessories',
    fetchKey: 'getAccessoriesData',
    stateKey: 'accessories',
  },
  footwear: {
    label: 'Footwear',
    apiPath: '/footwear',
    basePath: '/footwear',
    fetchKey: 'getFootwearData',
    stateKey: 'footwear',
  },
  homeDecor: {
    label: 'Home Decor',
    apiPath: '/homeDecor',
    basePath: '/homeDecor',
    fetchKey: 'getHomeDecorData',
    stateKey: 'homeDecor',
  },
};
