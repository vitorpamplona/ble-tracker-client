import { SET_DEVICE_ID } from "../actions/types";

const INITIAL_STATE = {
  deviceId: "",
};

export default function deviceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_DEVICE_ID:
      return {
        ...state,
        deviceId: action.payload.deviceId,
      };

    default:
      return state;
  }
}
