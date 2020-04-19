import BLEAdvertiser from 'react-native-ble-advertiser'
import AsyncStorage from '@react-native-community/async-storage';
import { NativeEventEmitter, NativeModules } from 'react-native';

import { MY_UUID } from '../constants/storage';

import { toUUID, fromUUID } from '../helpers/UUIDFormatter';
import { hex2a, a2hex }  from '../helpers/Hex2Ascii'
import { saveContactToUpload, SERVER } from '../helpers/SyncDB';

export default class BLEBackgroundService {
  static eventEmitter = new NativeEventEmitter(NativeModules.BLEAdvertiser);
  static onDeviceFoundListener;

  static _newDeviceListeners = []; // Objects that implement event onDevice(data)

  /**
   * If the app needs to update the screen at every new device. 
   */
  static addNewDeviceListener(callback) {
    var index = this._newDeviceListeners.indexOf(callback);
    if (index < 0)
      this._newDeviceListeners.push(callback);
  }
  static removeNewDeviceListener(callback) {
    var index = this._newDeviceListeners.indexOf(callback);
    if (index > -1) {
        this._newDeviceListeners.splice(index, 1);
    }
  }
  static emitNewDevice(data) {
    this._newDeviceListeners.forEach(callback => {
      callback.onDevice(data);
    });
  }

  static init() {
    BLEAdvertiser.setCompanyId(0x4C); 
  }

  static isValidUUID(uuid) {
    if (!uuid)return false;
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{10}00$/.test(uuid);
  }

  static addDevice(_uuid, _name, _rssi, _date) {
    AsyncStorage.getItem(MY_UUID).then(uuid => {
      saveContactToUpload(
        hex2a(fromUUID(uuid)), 
        hex2a(fromUUID(_uuid)), _rssi, _date);

      let device = {serial: hex2a(fromUUID(_uuid)), name: _name, rssi: _rssi, date: _date}
      this.emitNewDevice(device);  
    });
  }

  static setServicesUUID(deviceSerial) {
    let myUUID = toUUID(a2hex(deviceSerial));
    AsyncStorage.setItem(MY_UUID, myUUID);
  }

  // Called by Background function. 
  static pulse() {
    this.stop();
    this.start();
  }

  static clearListener() {
    if (this.onDeviceFoundListener) {
      this.onDeviceFoundListener.remove();
      this.onDeviceFoundListener = null;
    }
  }

  static start() {
    this.clearListener();

    this.onDeviceFoundListener = this.eventEmitter.addListener('onDeviceFound', (event) => {
      if (event.serviceUuids) {
        for(let i=0; i< event.serviceUuids.length; i++){
          if (this.isValidUUID(event.serviceUuids[i])) {
            console.log('onDeviceFound', event);
            this.addDevice(event.serviceUuids[i], event.deviceName, event.rssi, new Date())   
          }
        }
      }
    });

    AsyncStorage.getItem(MY_UUID).then(uuid => {
      console.log(uuid, "Starting Advertising");
      BLEAdvertiser.broadcast(uuid, [12,23,56], {})
      .then(sucess => console.log(uuid, "Adv Successful", sucess))
      .catch(error => console.log(uuid, "Adv Error", error));
      
      console.log(uuid, "Starting Scanner");
      BLEAdvertiser.scan([12,23,56], {})
      .then(sucess => console.log(uuid, "Scan Successful", sucess))
      .catch(error => console.log(uuid, "Scan Error", error)); 
    });
  }

  static stop(){
    this.clearListener();

    AsyncStorage.getItem(MY_UUID).then(uuid => {
      console.log(uuid, "Stopping Broadcast");
      BLEAdvertiser.stopBroadcast()
        .then(sucess => console.log(uuid, "Stop Broadcast Successful", sucess))
        .catch(error => console.log(uuid, "Stop Broadcast Error", error));

      console.log(uuid, "Stopping Scanning");
      BLEAdvertiser.stopScan()
        .then(sucess => console.log(uuid, "Stop Scan Successful", sucess))
        .catch(error => console.log(uuid, "Stop Scan Error", error));
    });
  }
}