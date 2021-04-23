const initialState = ["food", "clothes", "fuel", "rent"];

export default (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_NEW":
      return [...state, action.payload];
    default:
      return state;
  }
};
