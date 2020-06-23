import {
  ACCEPT_PRIVACY_POLICY,
  SET_PERMISSIONS,
  SET_LOADING,
} from "../actions/types";

const INITIAL_STATE = {
  policyAccepted: false,
  permissionsGranted: false,
  loading: true,
};

export default function globalReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACCEPT_PRIVACY_POLICY:
      return {
        ...state,
        policyAccepted: true,
      };

    case SET_PERMISSIONS:
      return {
        ...state,
        permissionsGranted: true,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
}
