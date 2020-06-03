import axios from "axios";

export const fetchUserAction = () => {
  return (dispatch) => {
    axios.get("/app/current_user").then((res) => {
      dispatch({ type: "GET_USER", payload: res.data });
    });
  };
};
