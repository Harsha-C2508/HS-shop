import * as types from '../AuthRedux/actionType';
import client, { setAuthToken } from '../../api/client';

const applyAuthSuccess = (payload) => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

const login = (payload) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  return client
    .post('/auth/login', payload)
    .then((r) => {
      const { token, user } = r.data;
      setAuthToken(token);
      dispatch(applyAuthSuccess({ token, user }));
      return user;
    })
    .catch((e) => {
      dispatch({
        type: types.LOGIN_FAILURE,
        payload: e.response?.data?.message || 'Login failed',
      });
      throw e;
    });
};

const signUp = (payload) => (dispatch) => {
  dispatch({ type: types.SIGN_UP_REQUEST });
  return client
    .post('/auth/register', {
      email: payload.email,
      password: payload.password,
      name: payload.name,
      number: payload.number,
    })
    .then((res) => {
      const { token, user } = res.data;
      setAuthToken(token);
      dispatch({ type: types.SIGN_UP_SUCCESS, payload: { token, user } });
      return user;
    })
    .catch((error) => {
      dispatch({
        type: types.SIGN_UP_FAILURE,
        payload: error.response?.data?.message || 'Sign up failed',
      });
      throw error;
    });
};

const restoreSession = () => (dispatch) => {
  const token = localStorage.getItem('hs_shop_token');
  if (!token) {
    return Promise.resolve(null);
  }

  return client
    .get('/auth/me')
    .then((r) => {
      dispatch({
        type: types.RESTORE_SESSION,
        payload: { token, user: r.data.user },
      });
      return r.data.user;
    })
    .catch(() => {
      setAuthToken(null);
      dispatch({ type: types.RESTORE_SESSION_FAILURE });
      return null;
    });
};

const logout = () => (dispatch) => {
  setAuthToken(null);
  dispatch({ type: types.LOGOUT });
};

export { login, signUp, restoreSession, logout };
