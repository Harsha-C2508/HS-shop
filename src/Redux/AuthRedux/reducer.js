import * as types from "./actionType";

const initialState = {
  isAuth: false,
  isAuthen: false,
  user: null,
  token: "",
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
    case types.SIGN_UP_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errorMessage: "",
      };

    case types.LOGIN_SUCCESS:
    case types.SIGN_UP_SUCCESS:
    case types.RESTORE_SESSION:
      return {
        ...state,
        isAuth: true,
        isAuthen: payload.user?.role === "admin",
        user: payload.user,
        token: payload.token,
        isLoading: false,
        isError: false,
        errorMessage: "",
      };

    case types.LOGIN_FAILURE:
    case types.SIGN_UP_FAILURE:
    case types.RESTORE_SESSION_FAILURE:
      return {
        ...state,
        isAuth: false,
        isAuthen: false,
        user: null,
        token: "",
        isLoading: false,
        isError: true,
        errorMessage: payload || "Authentication failed",
      };

    case types.LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export { reducer };
