import {
  SET_DEVICE_ID,
  SET_SERVER_ADDRESS,
  RESET_EMPLOYEE_VALUES,
  SET_EMPLOYEE_DATA,
} from "../actions/types";

const INITIAL_STATE = {
  deviceId: "",
  server: "",
  employeeId: "",
  ipAddress: "",
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

    case SET_EMPLOYEE_DATA:
      return {
        ...state,
        employeeId: action.payload.employeeId,
        ipAddress: action.payload.ipAddress,
        server: action.payload.serverAddress,
        deviceId: action.payload.employeeId,
      };

    default:
      return state;
  }
}
