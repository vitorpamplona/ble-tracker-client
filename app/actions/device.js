import { action } from "typesafe-actions";
import {
  SET_DEVICE_ID,
  SET_SERVER_ADDRESS,
  RESET_EMPLOYEE_VALUES,
  SET_EMPLOYEE_DATA,
} from "./types";

export const setDeviceId = (deviceId) => action(SET_DEVICE_ID, { deviceId });
export const setServer = (server) => action(SET_SERVER_ADDRESS, { server });
export const resetEmployeeValues = () => action(RESET_EMPLOYEE_VALUES, {});
export const setEmployeeData = ({ employeeId, ipAddress, serverAddress }) =>
  action(SET_EMPLOYEE_DATA, { employeeId, ipAddress, serverAddress });
