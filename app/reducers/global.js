import {
  ACCEPT_PRIVACY_POLICY,
  SET_PERMISSIONS,
  SET_LOADING,
  SET_USER_ONBOARDED,
} from "../actions/types";

const INITIAL_STATE = {
  policyAccepted: false,
  permissionsGranted: false,
  loading: true,
  isOnboarded: false,
  isPersonal: true,
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

    case SET_USER_ONBOARDED:
      return {
        ...state,
        isOnboarded: true,
      };

    default:
      return state;
  }
}
