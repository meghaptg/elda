const initialState = [
  {
    title: "tshirt",
    category: "clothes",
    amount: 500,
    date: "22/04/2021, 22:24:05",
  },
  {
    title: "pizza",
    category: "food",
    amount: 350,
    date: "22/04/2021, 23:14:35",
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
