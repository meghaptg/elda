const initialState = [
  {
    title: "tshirt",
    category: "clothes",
    amount: 500,
    dateStamp: new Date(2021, 3, 2).toLocaleString(),
  },
  {
    title: "pizza",
    category: "food",
    amount: 350,
    dateStamp: new Date(2021, 2, 1).toLocaleString(),
  },
];

export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ENTRY":
      return [...state, action.payload];
    case "DELETE_ENTRY":
    //TODO
    default:
      return state;
  }
};
