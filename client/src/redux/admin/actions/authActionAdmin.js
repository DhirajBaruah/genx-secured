import axios from "axios";
import { returnErrorsAdmin } from "./errorActionAdmin";

export const loadAdmin = () => (dispatch, getState) => {
  // Admin loading
  dispatch({ type: "ADMIN_LOADING" });

  axios
    .get("/admin/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: "ADMIN_LOADED",
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrorsAdmin(err.response.data, err.response.status));
      dispatch({
        type: "AUTH_ERROR",
      });
    });
};
// Register admin
// export const registerAdmin = ( email, password ) => (dispatch) => {

//   //headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials:'include'
//   };
//   //Request body
//   const body = JSON.stringify({email, password });
//   axios
//     .post("/admin/signup", body, config)
//     .then((res) =>
//       dispatch({
//         type: "ADMIN_REGISTER_SUCCESS",
//         payload: res.data,
//       })
//     )
//     .catch((err) => {
//       dispatch(
//         returnErrorsAdmin(err.response.data, err.response.status, "REGISTER_FAIL")
//       );
//       dispatch({
//         type: "ADMIN_REGISTER_FAIL",
//       });
//     });
// };

//Admin login 
export const loginAdmin = ( email, password ) => (dispatch) => {

  //headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    credentials:'include',
  };
  //Request body
  const body = JSON.stringify({ email, password });
  axios
    .post("/admin/signin", body, config)
    .then((res) =>
      dispatch({
        type: "ADMIN_LOGIN_SUCCESS",
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrorsAdmin(err.response.data, err.response.status, "ADMIN_LOGIN_FAIL")
      );
      dispatch({
        type: "ADMIN_LOGIN_FAIL",
      });
    });
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
 
  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
    credentials:'include',
  };

  return config;
};


// Admin logout
export const logoutAdmin  = () => (dispatch, getState) => {
  
 console.log('ent')
    axios
    .post("/admin/logoutAdmin", tokenConfig(getState))
    .then((res) =>
      dispatch({
         type: "ADMIN_LOGOUT_SUCCESS" 
      })
    )
    .catch((err) => {
      dispatch(returnErrorsAdmin(err.response.data, err.response.status));
      dispatch({
        type: "ADMIN_AUTH_ERROR",
      });
    });
};
