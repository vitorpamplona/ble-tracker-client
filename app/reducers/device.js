import {
  SET_DEVICE_ID,
  SET_SERVER_ADDRESS,
  RESET_EMPLOYEE_VALUES,
} from "../actions/types";

const INITIAL_STATE = {
  deviceId: "",
  server: "",
};

export default function deviceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_DEVICE_ID:
      return {
        ...state,
        deviceId: action.payload.deviceId,
      };

    case SET_SERVER_ADDRESS:
      return {
        ...state,
        server: action.payload.server,
      };

    case RESET_EMPLOYEE_VALUES:
      return {
        ...state,
        deviceId: "",
        server: "",
      };

    default:
      return state;
  }
}
