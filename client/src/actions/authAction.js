import axios from "axios";
import { returnErrors } from "./errorAction";

export const loadUser = () => (dispatch, getState) => {
  //User loading
  dispatch({ type: "USER_LOADING" });

  axios
    .get("/app/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: "USER_LOADED",
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: "AUTH_ERROR",
      });
    });
};
//Register user
export const register = ( fname, lname, email, password ) => (dispatch) => {

  //headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //Request body
  const body = JSON.stringify({ fname, lname, email, password });
  axios
    .post("/app/signup", body, config)
    .then((res) =>
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: "REGISTER_FAIL",
      });
    });
};

//Login user
export const login = ( email, password ) => (dispatch) => {

  //headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //Request body
  const body = JSON.stringify({ email, password });
  axios
    .post("/app/signin", body, config)
    .then((res) =>
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: "LOGIN_FAIL",
      });
    });
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

// Logout User
export const logout = () => {
  return {
    type: "LOGOUT_SUCCESS"
  };
};
