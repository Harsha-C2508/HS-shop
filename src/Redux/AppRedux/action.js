import client from '../../api/client';
import * as types from './actionType';

const getPaintingData = (params) => (dispatch) => {
  dispatch({ type: types.GET_DATA_PAINTING_REQUEST });
  return client
    .get('/painting', params)
    .then((r) =>
      dispatch({
        type: types.GET_DATA_PAINTING_SUCCESS,
        payload: r.data,
      })
    )
    .catch((e) => {
      dispatch({ type: types.GET_DATA_PAINTING_FAILURE });
      throw e;
    });
};

const CATEGORY_API_PATH = {
  home: '/home',
  mens: '/mensMeterial',
  womens: '/women',
  painting: '/painting',
  accessories: '/accessories',
  footwear: '/footwear',
  homeDecor: '/homeDecor',
};

const getProductById = (id, category) => (dispatch) => {
  dispatch({ type: types.GET_PRODUCT_DETAIL_REQUEST });
  const basePath = (category && CATEGORY_API_PATH[category]) || '/product';
  return client
    .get(`${basePath}/${id}`)
    .then((r) => {
      dispatch({ type: types.GET_PRODUCT_DETAIL_SUCCESS, payload: r.data });
      return r.data;
    })
    .catch(() => {
      dispatch({ type: types.GET_PRODUCT_DETAIL_FAILURE });
      throw new Error('Not found');
    });
};

const validateCoupon = (code, subtotal) => (dispatch) => {
  dispatch({ type: types.VALIDATE_COUPON_REQUEST });
  return client
    .post('/coupons/validate', { code, subtotal })
    .then((r) => {
      dispatch({ type: types.VALIDATE_COUPON_SUCCESS, payload: r.data });
      return r.data;
    })
    .catch((e) => {
      dispatch({
        type: types.VALIDATE_COUPON_FAILURE,
        payload: e.response?.data?.message || 'Invalid coupon',
      });
      throw e;
    });
};

const searchProductsHome = (query) => (dispatch) => {
  dispatch({ type: types.GET_HOME_DATA_REQUEST1 });
  return client
    .get('/search', { params: { q: query } })
    .then((r) =>
      dispatch({
        type: types.GET_HOME_DATA_SUCCESS1,
        payload: r.data,
      })
    )
    .catch((e) => {
      dispatch({ type: types.GET_HOME_DATA_FAILURE1 });
      throw e;
    });
};

const getHomeData = (params) => (dispatch) => {
  dispatch({ type: types.GET_HOME_DATA_REQUEST1 });
  return client
    .get('/home', params)
    .then((r) =>
      dispatch({
        type: types.GET_HOME_DATA_SUCCESS1,
        payload: r.data,
      })
    )
    .catch((e) => {
      dispatch({ type: types.GET_HOME_DATA_FAILURE1 });
      throw e;
    });
};

const getMensData = (params) => (dispatch) => {
  dispatch({ type: types.GET_MENS_DATA_REQUEST2 });
  return client
    .get('/mensMeterial', params)
    .then((r) =>
      dispatch({
        type: types.GET_MENS_DATA_SUCCESS2,
        payload: r.data,
      })
    )
    .catch((e) => {
      dispatch({ type: types.GET_MENS_DATA_FAILURE2 });
      throw e;
    });
};

const getWomensData = (params) => (dispatch) => {
  dispatch({ type: types.GET_WOMENS_DATA_REQUEST3 });
  return client
    .get('/women', params)
    .then((r) =>
      dispatch({
        type: types.GET_WOMENS_DATA_SUCCESS3,
        payload: r.data,
      })
    )
    .catch((e) => {
      dispatch({ type: types.GET_WOMENS_DATA_FAILURE3 });
      throw e;
    });
};

const getAccessoriesData = (params) => (dispatch) => {
  dispatch({ type: types.GET_ACCESSORIES_DATA_REQUEST });
  return client
    .get('/accessories', params)
    .then((r) =>
      dispatch({
        type: types.GET_ACCESSORIES_DATA_SUCCESS,
        payload: r.data,
      })
    )
    .catch((e) => {
      dispatch({ type: types.GET_ACCESSORIES_DATA_FAILURE });
      throw e;
    });
};

const getFootwearData = (params) => (dispatch) => {
  dispatch({ type: types.GET_FOOTWEAR_DATA_REQUEST });
  return client
    .get('/footwear', params)
    .then((r) =>
      dispatch({
        type: types.GET_FOOTWEAR_DATA_SUCCESS,
        payload: r.data,
      })
    )
    .catch((e) => {
      dispatch({ type: types.GET_FOOTWEAR_DATA_FAILURE });
      throw e;
    });
};

const getHomeDecorData = (params) => (dispatch) => {
  dispatch({ type: types.GET_HOMEDECOR_DATA_REQUEST });
  return client
    .get('/homeDecor', params)
    .then((r) =>
      dispatch({
        type: types.GET_HOMEDECOR_DATA_SUCCESS,
        payload: r.data,
      })
    )
    .catch((e) => {
      dispatch({ type: types.GET_HOMEDECOR_DATA_FAILURE });
      throw e;
    });
};

const getDataAtAdminPage = () => (dispatch) => {
  dispatch({ type: types.ADMIN_PAGE_PRODUCT_REQUEST });
  return client
    .get('/admin/products')
    .then((r) =>
      dispatch({
        type: types.ADMIN_PAGE_PRODUCT_SUCCESS,
        payload: r.data,
      })
    )
    .catch(() => dispatch({ type: types.ADMIN_PAGE_PRODUCT_FAILURE }));
};

const addCart = (data) => (dispatch) => {
  dispatch({ type: types.ADD_TO_CART_REQUEST });
  return client
    .post('/cart', data)
    .then(() => dispatch({ type: types.ADD_TO_CART_SUCCESS }))
    .catch(() => dispatch({ type: types.ADD_TO_CART_FAILURE }));
};

const getDataFromCart = () => (dispatch) => {
  dispatch({ type: types.GET_DATA_FROM_CART_REQUEST });
  return client
    .get('/cart')
    .then((res) =>
      dispatch({
        type: types.GET_DATA_FROM_CART_SUCCESS,
        payload: res.data,
      })
    )
    .catch(() => dispatch({ type: types.GET_DATA_FROM_CART_FAILURE }));
};

const deleteCart = (data) => (dispatch) => {
  dispatch({ type: types.DELETE_THE_CART_ITEM_REQUEST });
  return client
    .delete(`/cart/${data}`)
    .then((res) => {
      dispatch({
        type: types.DELETE_THE_CART_ITEM_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: types.GET_DATA_FROM_CART_SUCCESS,
        payload: res.data,
      });
    })
    .catch(() => dispatch({ type: types.DELETE_THE_CART_ITEM_FAILURE }));
};

const getDataDetailshome = (id) => (dispatch) => {
  dispatch({ type: types.GET_SINGLE_DATA_REQUEST });
  return client
    .get(`/home/${id}`)
    .then((res) =>
      dispatch({
        type: types.GET_SINGLE_DATA_SUCCESS,
        payload: res.data,
      })
    )
    .catch(() => dispatch({ type: types.GET_SINGLE_DATA_FAILURE }));
};

const getDataDetailsMens = (id) => (dispatch) => {
  dispatch({ type: types.GET_SINGLE_DATA_MEN_REQUEST });
  return client
    .get(`/mensMeterial/${id}`)
    .then((res) =>
      dispatch({
        type: types.GET_SINGLE_DATA_MEN_SUCCESS,
        payload: res.data,
      })
    )
    .catch(() => dispatch({ type: types.GET_SINGLE_DATA_MEN_FAILURE }));
};

const getDataDetailsWomens = (id) => (dispatch) => {
  dispatch({ type: types.GET_SINGLE_DATA_WOMEN_REQUEST });
  return client
    .get(`/women/${id}`)
    .then((res) =>
      dispatch({
        type: types.GET_SINGLE_DATA_WOMEN_SUCCESS,
        payload: res.data,
      })
    )
    .catch(() => dispatch({ type: types.GET_SINGLE_DATA_WOMEN_FAILURE }));
};

const getDataDetailsPaint = (id) => (dispatch) => {
  dispatch({ type: types.GET_SINGLE_DATA_PAINT_REQUEST });
  return client
    .get(`/painting/${id}`)
    .then((res) =>
      dispatch({
        type: types.GET_SINGLE_DATA_PAINT_SUCCESS,
        payload: res.data,
      })
    )
    .catch(() => dispatch({ type: types.GET_SINGLE_DATA_PAINT_FAILURE }));
};

const editProdData = ({ dispatch, img, price, offer, star, params }) => {
  dispatch({ type: types.EDIT_PRODUCT_REQUEST });
  return client
    .patch(`/home/${params.id}`, { img, price, offer, star })
    .then(() => dispatch({ type: types.EDIT_PRODUCT_SUCCESS }))
    .catch(() => dispatch({ type: types.EDIT_PRODUCT_FAILURE }));
};

const addNewProduct = (payload) => (dispatch) => {
  dispatch({ type: types.ADD_NEW_PRODUCT_REQUEST });
  return client
    .post('/home', payload)
    .then((r) =>
      dispatch({
        type: types.ADD_NEW_PRODUCT_SUCCESS,
        payload: r.data,
      })
    )
    .catch((e) =>
      dispatch({
        type: types.ADD_NEW_PRODUCT_FAILURE,
        payload: e,
      })
    );
};

const customerDataAddress = (payload) => (dispatch) => {
  dispatch({ type: types.ADD_DATA_SHOP_CUSTOMER_REQUEST });
  return client
    .post('/userDetailShop', payload)
    .then((r) =>
      dispatch({
        type: types.ADD_DATA_SHOP_CUSTOMER_SUCCESS,
        payload: r.data,
      })
    )
    .catch((e) =>
      dispatch({
        type: types.ADD_DATA_SHOP_CUSTOMER_FAILURE,
        payload: e,
      })
    );
};

const getCustomerDataAddress = () => (dispatch) => {
  dispatch({ type: types.GET_DATA_SHOP_CUSTOMER_REQUEST });
  return client
    .get('/userDetailShop')
    .then((r) =>
      dispatch({
        type: types.GET_DATA_SHOP_CUSTOMER_SUCCESS,
        payload: r.data,
      })
    )
    .catch((e) =>
      dispatch({
        type: types.GET_DATA_SHOP_CUSTOMER_FAILURE,
        payload: e,
      })
    );
};

const customerDataAddressOnline = (payload) => (dispatch) => {
  dispatch({ type: types.ADD_DATA_HOME_CUSTOMER_REQUEST });
  return client
    .post('/userDetails', payload)
    .then((r) =>
      dispatch({
        type: types.ADD_DATA_HOME_CUSTOMER_SUCCESS,
        payload: r.data,
      })
    )
    .catch((e) =>
      dispatch({
        type: types.ADD_DATA_HOME_CUSTOMER_FAILURE,
        payload: e,
      })
    );
};

const getCustomerDataAddressOnline = () => (dispatch) => {
  dispatch({ type: types.GET_DATA_HOME_CUSTOMER_REQUEST });
  return client
    .get('/userDetails')
    .then((r) =>
      dispatch({
        type: types.GET_DATA_HOME_CUSTOMER_SUCCESS,
        payload: r.data,
      })
    )
    .catch((e) =>
      dispatch({
        type: types.GET_DATA_HOME_CUSTOMER_FAILURE,
        payload: e,
      })
    );
};

const editStatusHome = ({ dispatch, status, orderId }) => {
  dispatch({ type: types.EDIT_STATUS_HOME_REQUEST });
  return client
    .patch(`/userDetails/${orderId}`, { status })
    .then(() => dispatch({ type: types.EDIT_STATUS_HOME_SUCCESS }))
    .catch(() => dispatch({ type: types.EDIT_STATUS_HOME_FAILURE }));
};

const editStatusShop = ({ dispatch, Sstatus, orderId }) => {
  dispatch({ type: types.EDIT_STATUS_SHOP_REQUEST });
  return client
    .patch(`/userDetailShop/${orderId}`, { Sstatus })
    .then(() => dispatch({ type: types.EDIT_STATUS_SHOP_SUCCESS }))
    .catch(() => dispatch({ type: types.EDIT_STATUS_SHOP_FAILURE }));
};

const addWish = (data) => (dispatch) => {
  dispatch({ type: types.ADD_TO_WISH_REQUEST });
  return client
    .post('/wish', data)
    .then(() => dispatch({ type: types.ADD_TO_WISH_SUCCESS }))
    .catch(() => dispatch({ type: types.ADD_TO_WISH_FAILURE }));
};

const getDataFromWish = () => (dispatch) => {
  dispatch({ type: types.GET_DATA_FROM_WISH_REQUEST });
  return client
    .get('/wish')
    .then((res) =>
      dispatch({
        type: types.GET_DATA_FROM_WISH_SUCCESS,
        payload: res.data,
      })
    )
    .catch(() => dispatch({ type: types.GET_DATA_FROM_WISH_FAILURE }));
};

const deleteWish = (data) => (dispatch) => {
  dispatch({ type: types.DELETE_THE_WISH_ITEM_REQUEST });
  return client
    .delete(`/wish/${data}`)
    .then((res) => {
      dispatch({
        type: types.DELETE_THE_WISH_ITEM_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: types.GET_DATA_FROM_WISH_SUCCESS,
        payload: res.data,
      });
    })
    .catch(() => dispatch({ type: types.DELETE_THE_WISH_ITEM_FAILURE }));
};

const updateCartQuantity = (id, quantity) => (dispatch) => {
  dispatch({ type: types.UPDATE_CART_QUANTITY_REQUEST });
  return client
    .patch(`/cart/${id}`, { quantity: Number(quantity) })
    .then((res) => {
      dispatch({
        type: types.UPDATE_CART_QUANTITY_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: types.GET_DATA_FROM_CART_SUCCESS,
        payload: res.data,
      });
    })
    .catch(() => dispatch({ type: types.UPDATE_CART_QUANTITY_FAILURE }));
};

const deleteProduct = (id) => (dispatch) => {
  dispatch({ type: types.DELETE_PRODUCT_REQUEST });
  return client
    .delete(`/admin/products/${id}`)
    .then(() => dispatch({ type: types.DELETE_PRODUCT_SUCCESS }))
    .catch(() => dispatch({ type: types.DELETE_PRODUCT_FAILURE }));
};

const getMyOrders = () => (dispatch) => {
  dispatch({ type: types.GET_MY_ORDERS_REQUEST });
  return client
    .get('/mine')
    .then((r) =>
      dispatch({
        type: types.GET_MY_ORDERS_SUCCESS,
        payload: r.data,
      })
    )
    .catch(() => dispatch({ type: types.GET_MY_ORDERS_FAILURE }));
};

const searchProducts = (query) => () => client.get('/search', { params: { q: query } });

const createCheckoutSession = (payload) => () =>
  client.post('/payments/create-checkout-session', payload);

export {
  getPaintingData,
  getHomeData,
  getMensData,
  getWomensData,
  getAccessoriesData,
  getFootwearData,
  getHomeDecorData,
  getDataAtAdminPage,
  editProdData,
  addCart,
  getDataFromCart,
  deleteCart,
  getDataDetailshome,
  getDataDetailsMens,
  getDataDetailsWomens,
  getDataDetailsPaint,
  addNewProduct,
  customerDataAddress,
  getCustomerDataAddress,
  customerDataAddressOnline,
  getCustomerDataAddressOnline,
  editStatusHome,
  editStatusShop,
  addWish,
  getDataFromWish,
  deleteWish,
  createCheckoutSession,
  updateCartQuantity,
  deleteProduct,
  getMyOrders,
  searchProducts,
  searchProductsHome,
  getProductById,
  validateCoupon,
};
