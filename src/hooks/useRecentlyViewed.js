const STORAGE_KEY = 'hs_recently_viewed';
const MAX_ITEMS = 6;

export const getRecentlyViewed = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};

export const addRecentlyViewed = (product) => {
  if (!product?.id && !product?._id) return;
  const id = product._id || product.id;
  const entry = {
    id,
    name: product.name,
    img: product.img,
    price: product.price,
    category: product.category,
    basePath: product.basePath || '/home',
  };
  const list = getRecentlyViewed().filter((p) => p.id !== id);
  list.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_ITEMS)));
};

export default addRecentlyViewed;
