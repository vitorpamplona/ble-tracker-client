import { CONTACT, LAST_SEEN } from "../constants/storage";
import AsyncStorage from "@react-native-community/async-storage";

import { NativeModules } from "react-native";

const PROD_HOSTNAME = "safepath.tch.harvard.edu:80";

// Load compiler IP as Server (assuming running ble-tracker-server in the same machine)
const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split("://")[1].split("/")[0];
const DEV_HOSTNAME = address.split(":")[0] + ":4567";

export const SERVER = "192.168.1.120:4567";

const c1MIN = 1000 * 60;
const ACCEPT_JSON = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

var cashedLastSeen = {};

export async function saveContactToUpload(_uploader, _contact, _rssi, _date) {
  lastSeenInMilliseconds = cashedLastSeen[_contact];

  if (
    !lastSeenInMilliseconds ||
    _date.getTime() > lastSeenInMilliseconds + c1MIN
  ) {
    let contactData = {
      uploader: _uploader,
      contact: _contact,
      rssi: _rssi,
      date: _date.toISOString(),
    };
    AsyncStorage.setItem(
      CONTACT + _contact + _date.toISOString(),
      JSON.stringify(contactData)
    );
    cashedLastSeen[_contact] = _date.getTime();
  }
}

export async function readyToUploadCounter() {
  let ks = await AsyncStorage.getAllKeys();
  return ks.filter((key) => key.startsWith(CONTACT)).length;
}

async function upload(contact_list) {
  return fetch("http://" + SERVER + "/api/v1/contacts", {
    method: "POST",
    headers: ACCEPT_JSON,
    body: JSON.stringify(values),
  });
}

function upload1000Keys() {
  AsyncStorage.getAllKeys().then((ks) => {
    let keysToUpload = ks
      .sort()
      .filter((key) => key.startsWith(CONTACT))
      .slice(0, 10000);

    AsyncStorage.multiGet(keysToUpload).then((data) => {
      if (data.length > 0) {
        keys = data.map((keyValue) => keyValue[0]);
        values = data.map((keyValue) => JSON.parse(keyValue[1]));

        upload(values)
          .then((response) => {
            if (response.status == 200) {
              AsyncStorage.multiRemove(keys);
            }
          })
          .catch((error) => {
            console.log("Upload Error", error);
          });
      }
    });
  });
}

export async function isOnline() {
  return fetch("http://" + SERVER + "/api/v1/health", {
    method: "GET",
    headers: ACCEPT_JSON,
  });
}

export async function sync() {
  upload1000Keys();
}
