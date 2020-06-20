// RETURN ERRORS
export const returnErrorsAdmin = (msg, status, id= null) => {
  return {
    type: "GET_ERRORS",
    payload: { msg, status, id }
  };
};

// CLEAR ERRORS
export const clearErrorsAdmin = () => {
  return {
    type: "CLEAR_ERRORS"
  };
};