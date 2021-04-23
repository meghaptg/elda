export const addEntry = (data) => (dispatch) =>
  dispatch({
    type: "ADD_ENTRY",
    payload: data,
  });
