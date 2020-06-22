import { combineReducers } from "redux";

import device from "./device";
import global from "./global";

export default combineReducers({
  device,
  global,
});
