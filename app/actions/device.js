import { action } from "typesafe-actions";
import { SET_DEVICE_ID } from "./types";

export const setDeviceId = (deviceId) => action(SET_DEVICE_ID, { deviceId });
