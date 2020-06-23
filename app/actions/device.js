import { action } from "typesafe-actions";
import {
  SET_DEVICE_ID,
  SET_SERVER_ADDRESS,
  RESET_EMPLOYEE_VALUES,
} from "./types";

export const setDeviceId = (deviceId) => action(SET_DEVICE_ID, { deviceId });
export const setServer = (server) => action(SET_SERVER_ADDRESS, { server });
export const resetEmployeeValues = () => action(RESET_EMPLOYEE_VALUES, {});
