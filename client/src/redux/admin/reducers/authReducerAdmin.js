const initialState = {
  isAuthenticatedAdmin: null,
  isLoadingAdmin: false,
  user: null,
};
export const authReducerAdmin = (state = initialState, action) => {
  switch (action.type) {
    case "ADMIN_LOADING":
      return {
        ...state,
        isloadingAdmin: true,
      };
    case "ADMIN_LOADED":
      return {
        ...state,
        isAuthenticatedAdmin: true,
        isLoadingAdmin: false,
        user: action.payload,
      };
    case "ADMIN_LOGIN_SUCCESS":
    case "ADMIN_REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticatedAdmin: true,
        isLoadingAdmin: false,
      };
    case "ADMIN_AUTH_ERROR":
    case "ADMIN_LOGIN_FAIL":
    case "ADMIN_REGISTER_FAIL":
    case "ADMIN_LOGOUT_SUCCESS":
      return {
        ...state,
        user: null,
        isAuthenticatedAdmin: false,
        isLoadingAdmin: false,
      };

    default:
      return state;
  }
};
