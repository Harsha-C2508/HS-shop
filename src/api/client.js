import axios from 'axios';

export const API_BASE = '/api';
export const TOKEN_KEY = 'hs_shop_token';

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  paramsSerializer: (params) => {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return;
      if (Array.isArray(value)) {
        value.forEach((item) => search.append(key, item));
      } else {
        search.append(key, value);
      }
    });
    return search.toString();
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Resolve an image path for use in <img> tags.
 * - External URLs (http/https) are returned as-is.
 * - API paths like /api/images/101.jpg stay relative so the CRA proxy
 *   (dev) or same-domain reverse proxy (prod) forwards them to the backend.
 */
export const resolveImageUrl = (imgPath) => {
  if (!imgPath) return '';
  return imgPath;
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export default client;
