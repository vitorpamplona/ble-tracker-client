import { CONTACT, LAST_SEEN } from '../constants/storage';
import AsyncStorage from '@react-native-community/async-storage';

// safepath.tch.harvard.edu:80/api/v1/contacts
//export const SERVER = "10.1.10.98:4567"
//export const SERVER = "192.168.0.11:4567";
export const SERVER = "safepath.tch.harvard.edu:80";

const c1MIN = 1000 * 60;
const ACCEPT_JSON = { "Accept": "application/json", "Content-Type": "application/json" };

export async function saveContactToUpload(_uploader, _contact, _rssi, _date) {
  AsyncStorage.getItem(LAST_SEEN + _contact).then(lastSeenInMilliseconds => {
      // Only records one per minute. 
      if (!lastSeenInMilliseconds || _date.getTime() > parseInt(lastSeenInMilliseconds) + c1MIN) {
        let contactData = { uploader:_uploader, contact: _contact, rssi:_rssi, date:_date.toISOString() };
        AsyncStorage.setItem(CONTACT + _contact + _date.toISOString(), JSON.stringify(contactData));  
        AsyncStorage.setItem(LAST_SEEN + _contact, _date.getTime().toString()); 
      }
  }); 
};

export async function readyToUploadCounter() {
    let ks = await AsyncStorage.getAllKeys();
    return ks.filter(key => key.startsWith(CONTACT)).length;
}

async function upload(contact_list) {
    return fetch('http://' + SERVER + "/api/v1/contacts", 
        {
            method: "POST",
            headers: ACCEPT_JSON,
            body: JSON.stringify(values)
        }
    );
}

function upload1000Keys() {
    AsyncStorage.getAllKeys().then(ks => {
        let keysToUpload = ks.sort().filter(key => key.startsWith(CONTACT)).slice(0,10000);

        AsyncStorage.multiGet(keysToUpload).then(data => {
            if (data.length > 0) { 
                keys = data.map(keyValue => keyValue[0]);
                values = data.map(keyValue => JSON.parse(keyValue[1]));
                
                upload(values).then(response => {
                    if (response.status == 200) {
                        AsyncStorage.multiRemove(keys);
                    }
                }).catch(error => {
                    console.log("Upload Error", error); 
                });
            }
        });
    });
}

async function isOnline() {
    return fetch('http://' + SERVER + "/api/v1/health", { method: "GET", headers: ACCEPT_JSON } );
}

export async function sync () {
    isOnline().then(response => {
        if (response.status == 200) { // is online
            upload1000Keys();
        }
    }).catch(error => {
        console.log("Phone Offline", error); 
    });
}