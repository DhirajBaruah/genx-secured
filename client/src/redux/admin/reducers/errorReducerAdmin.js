const initialState = {
  error: {},
  status: null,
  id: null,
};
export const errorReducerAdmin = (state = initialState, action) => {
  switch (action.type) {
    case "ADMIN_GET_ERRORS":
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case "ADMIN_CLEAR_ERRORS":
      return {
        errror: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
};
