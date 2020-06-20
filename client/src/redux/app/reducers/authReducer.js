const initialState = {
  // token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOADING":
      return {
        ...state,
        isloading: true,
      };
    case "USER_LOADED":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        // token: localStorage.getItem('token'),
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      // localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
    case "LOGOUT_SUCCESS":///////////*******Remove Cookie */
    // localStorage.removeItem('token');
      return {
        ...state,
        // token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};
