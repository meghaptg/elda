import { combineReducers } from "redux";
import data from "./data";
import categories from "./categories";
import theme from "./theme";

export default combineReducers({
  data,
  categories,
  theme,
});
