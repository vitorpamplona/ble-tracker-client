import { ACCEPT_PRIVACY_POLICY, SET_PERMISSIONS } from "../actions/types";

const INITIAL_STATE = {
  policyAccepted: false,
  permissionsGranted: false,
};

export default function globalReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
