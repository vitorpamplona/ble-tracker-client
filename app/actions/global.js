import { action } from "typesafe-actions";
import {
  ACCEPT_PRIVACY_POLICY,
  SET_PERMISSIONS,
  SET_LOADING,
  SET_USER_ONBOARDED,
  LOGOUT,
} from "./types";

export const acceptPrivacyPolicy = () => action(ACCEPT_PRIVACY_POLICY, {});
export const setPermissions = () => action(SET_PERMISSIONS, {});
export const setLoading = (loading) => action(SET_LOADING, { loading });
export const setUserOnboarded = () => action(SET_USER_ONBOARDED, {});
