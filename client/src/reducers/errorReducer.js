const initialState = {
  error: {},
  status: null,
  id: null,
};
export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ERRORS":
      return {
        msg: action.payload.msg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case "CLEAR_ERRORS":
      return {
        errror: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
};
