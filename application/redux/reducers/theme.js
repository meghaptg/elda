const data = {
  light: {
    primaryColor: "powderblue",
    secondaryColor: "lightgrey",
    backgroundColor: "white",
    fontColor: "black",
  },
  dark: {
    primaryColor: "pink",
    secondaryColor: "grey",
    backgroundColor: "black",
    fontColor: "white",
  },
};
const initialState = {
  selectedTheme: "light",
  theme: data["light"],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return {
        selectedTheme: action.payload,
        theme: data[action.payload],
      };
    default:
      return state;
  }
};
