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
  static onBluetoothStatusListener;

  static listeners = []; // Objects that implement event onDevice(data), onScanSatus, onBroadcastStatus

  /**
   * If the app needs to update the screen at every new device. 
   */
  static addNewDeviceListener(callback) {
    var index = this.listeners.indexOf(callback);
    if (index < 0)
      this.listeners.push(callback);
  }
  static removeNewDeviceListener(callback) {
    var index = this.listeners.indexOf(callback);
    if (index > -1) {
        this.listeners.splice(index, 1);
    }
  }
  static emitNewDevice(data) {
    this.listeners.forEach(callback => {
      callback.onDevice(data);
    });
  }
  static emitBroadcastingStatus(data) {
    this.listeners.forEach(callback => {
      callback.onBroadcastStatus(data);
    });
  }
  static emitScanningStatus(data) {
    this.listeners.forEach(callback => {
      callback.onScanStatus(data);
    });
  }
  static emitBluetoothStatus(data) {
    this.listeners.forEach(callback => {
      callback.onBluetoothStatus(data);
    });
  }

  static init() {
    BLEAdvertiser.setCompanyId(0x4C); 

    this.emitBroadcastingStatus('Initialized');
    this.emitScanningStatus('Initialized');
  }

  static requestBluetoothStatus() {
    BLEAdvertiser.getAdapterState().then(result => {
      this.emitBluetoothStatus(result === 'STATE_ON' ? "On" : "Off");
    }).catch(error => { 
      this.emitBluetoothStatus(error);
    });
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

  static enableBT() {
    BLEAdvertiser.enableAdapter();
  }

  static disableBT() {
    BLEAdvertiser.disableAdapter();
  }

  // Called by Background function. 
  static pulse() {
    this.enableBT();
    this.init();
    this.start();
  }

  static clearListener() {
    if (this.onDeviceFoundListener) {
      this.onDeviceFoundListener.remove();
      this.onDeviceFoundListener = null;
    }

    if (this.onBluetoothStatusListener) {
      this.onBluetoothStatusListener.remove();
      this.onBluetoothStatusListener = null;
    }
  }

  static start() {
    console.log("[BLEService] Starting BLE service");

    this.clearListener();

    this.emitBroadcastingStatus('Starting');
    this.emitScanningStatus('Starting');

    this.onDeviceFoundListener = this.eventEmitter.addListener('onDeviceFound', (event) => {
      if (event.serviceUuids) {
        for(let i=0; i< event.serviceUuids.length; i++){
          if (this.isValidUUID(event.serviceUuids[i])) {
            //console.log("[BLEService]", 'onDeviceFound', event);
            this.addDevice(event.serviceUuids[i], event.deviceName, event.rssi, new Date())   
          }
        }
      }
    });

    this.onBluetoothStatusListener = this.eventEmitter.addListener('onBTStatusChange', (bluetooth) => {
      this.emitBluetoothStatus(bluetooth.enabled ? "On" : "Off");

      if (!bluetooth.enabled) {
        this.emitBroadcastingStatus('Bluetooth Off');
        this.emitScanningStatus('Bluetooth Off');
      }
    });

    AsyncStorage.getItem(MY_UUID).then(uuid => {
      if (uuid) {
        console.log("[BLEService]", hex2a(fromUUID(uuid)), "Starting Advertising");
        BLEAdvertiser.broadcast(uuid, [1,0,0,0], {
          advertiseMode: BLEAdvertiser.ADVERTISE_MODE_LOW_POWER, 
          txPowerLevel: BLEAdvertiser.ADVERTISE_TX_POWER_LOW, 
          connectable: false, 
          includeDeviceName: false, includeTxPowerLevel: false
        })
        .then(sucess => this.emitBroadcastingStatus("Started"))
        .catch(error => this.emitBroadcastingStatus(error));
        
        console.log("[BLEService]", hex2a(fromUUID(uuid)), "Starting Scanner");
        BLEAdvertiser.scan([1,0,0,0], {scanMode: BLEAdvertiser.SCAN_MODE_BALANCED})
        .then(sucess => this.emitScanningStatus("Started"))
        .catch(error => this.emitScanningStatus(error)); 
      }
    });
  }

  static stop(){
    console.log("[BLEService] Stopping BLE service");

    this.clearListener();

    this.emitBroadcastingStatus('Stopping');
    this.emitScanningStatus('Stopping');

    AsyncStorage.getItem(MY_UUID).then(uuid => {
      if (uuid) {
        console.log("[BLEService]", hex2a(fromUUID(uuid)), "Stopping Broadcast");
        BLEAdvertiser.stopBroadcast()
          .then(sucess => this.emitBroadcastingStatus("Stopped"))
          .catch(error => this.emitBroadcastingStatus(error));

        console.log("[BLEService]", hex2a(fromUUID(uuid)), "Stopping Scanning");
        BLEAdvertiser.stopScan()
          .then(sucess => this.emitScanningStatus("Stopped"))
          .catch(error => this.emitScanningStatus(error));
      }
    });
  }
}