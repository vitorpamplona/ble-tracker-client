import React, {Component } from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import Moment from 'moment';

import { Alert, Platform } from 'react-native';
import { NativeEventEmitter, NativeModules } from 'react-native';

import update from 'immutability-helper';


import { requestLocationPermission } from './services/PermissionRequests';
import { toUUID, fromUUID } from './helpers/UUIDFormatter';
import { saveContactToUpload, SERVER } from './helpers/SyncDB';
import { hex2a, a2hex }  from './helpers/Hex2Ascii'

import BLEAdvertiser from 'react-native-ble-advertiser'
import BackgroundTaskServices from './services/BackgroundTaskService';
import BLEBackgroundService from './services/BLEBackgroundService';

import DeviceInfo from 'react-native-device-info';

import {
  Header,
  Colors
} from 'react-native/Libraries/NewAppScreen';

class Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid:'',
            devicesFound:[]
        }
    }

    isValidUUID(uuid) {
      if (!uuid)return false;
      return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{10}00$/.test(uuid);
    }

    addDevice(_uuid, _name, _rssi, _date) {
      saveContactToUpload(
        hex2a(fromUUID(this.state.uuid)), 
        hex2a(fromUUID(_uuid)), _rssi, _date);

      let index = -1;
      for(let i=0; i< this.state.devicesFound.length; i++){
        if (this.state.devicesFound[i].uuid == _uuid) {
          index = i;
        }
      }
      if (index<0) {
        let dev = {uuid:_uuid, name:_name, rssi:_rssi, start:_date, end:_date};
        this.setState({
          devicesFound: update(this.state.devicesFound, 
            {$push: [dev]}
          )
        });
      } else {
        //let dev = this.state.devicesFound[index];
        //const newList = this.state.devicesFound.splice(index, 1);
        const itemIndex = index;
        this.setState({
          devicesFound: update(this.state.devicesFound, 
            {[itemIndex]: {end: {$set: _date}, rssi: {$set: _rssi || this.state.devicesFound[itemIndex].rssi }}}
          )
        });
      }
    }

    componentDidMount(){
      requestLocationPermission().then(() => {
        let serialNumber = DeviceInfo.getSerialNumber().then(deviceSerial => {
          console.log("Serial Number", deviceSerial);
          console.log("Serial Number Hex", a2hex(deviceSerial));
          console.log("Serial Number Hex Decoded", hex2a(a2hex(deviceSerial)));
          console.log("Serial Number Hex Decoded", toUUID(a2hex(deviceSerial)));
          console.log("Is Valid UUID", this.isValidUUID(toUUID(a2hex(deviceSerial))));
          this.setState({
            uuid: toUUID(a2hex(deviceSerial))
          });
          this.start();
        });

        console.log("BLE Advertiser", BLEAdvertiser);
        BLEAdvertiser.setCompanyId(0x4C); 
        
        const eventEmitter = Platform.select({
          ios: new NativeEventEmitter(NativeModules.BLEAdvertiser),
          android: new NativeEventEmitter(NativeModules.BLEAdvertiser),
        });

        eventEmitter.addListener('onDeviceFound', (event) => {
          if (event.serviceUuids) {
            for(let i=0; i< event.serviceUuids.length; i++){
              if (this.isValidUUID(event.serviceUuids[i])) {
                console.log('onDeviceFound', event);
                this.addDevice(event.serviceUuids[i], event.deviceName, event.rssi, new Date())   
              }
            }
          }
        });
      });
    }

    start() {
      BLEBackgroundService.start(this.state.uuid);

      this.setState({
        isLogging: true,
      });
    }

    stop(){
      BLEBackgroundService.stop(this.state.uuid);

      this.setState({
        isLogging: false,
      });
    }

    onClearArray = () => {
      this.setState({ devicesFound: [] });
    };

    short(str) {
      return str.substring(0, 4) + " ... " + str.substring(str.length-4, str.length); 
    }

    dateDiffSecs(start, end) {
      return Math.floor((end.getTime() - start.getTime())/1000);
    }

    dateStr(dt) {
      return Moment(dt).format('H:mm');
    }

    render() {
      return (
        <SafeAreaView>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Contact Tracing</Text>
              <Text style={styles.sectionDescription}>
                Broadcasting: 
                <Text style={styles.highlight}> { hex2a(fromUUID(this.state.uuid)) }</Text>
              </Text>
              <Text style={styles.sectionDescription}>
                Server: <Text style={styles.highlight}>{ SERVER }</Text>
              </Text>
            </View>

            <View style={styles.sectionContainer}>
              {this.state.isLogging ? (
              <TouchableOpacity
                onPress={() => this.stop()}
                style={styles.stopLoggingButtonTouchable}>
                <Text style={styles.stopLoggingButtonText}>
                  Stop
                </Text>
              </TouchableOpacity>
                ) : (
              <TouchableOpacity
                onPress={() => this.start()}
                style={styles.startLoggingButtonTouchable}>
                <Text style={styles.startLoggingButtonText}>
                  Start
                </Text>
              </TouchableOpacity>
              )}
            </View>

            <View style={styles.sectionContainerFlex}>
              <Text style={styles.sectionTitle}>Devices Around</Text>
              <FlatList
                  data={ this.state.devicesFound }
                  renderItem={({item}) => <Text style={styles.itemPastConnections}>{this.dateStr(item.start)} ({this.dateDiffSecs(item.start, item.end)}s): {hex2a(fromUUID(item.uuid))} {item.rssi} {item.name}</Text>}
                  keyExtractor={item => item.uuid}
                  />
            </View>

            <View style={styles.sectionContainer}>
              <TouchableOpacity
                onPress={this.onClearArray}
                style={styles.startLoggingButtonTouchable}>
                <Text style={styles.startLoggingButtonText}>
                  Clear Devices
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.white,
    height: "100%",
  },
  sectionContainerFlex: {
    flex: 1,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionContainer: {
    flex: 0,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 8,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center'
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  startLoggingButtonTouchable: {
    borderRadius: 12,
    backgroundColor: '#665eff',
    height: 52,
    alignSelf: 'center',
    width: 300,
    justifyContent: 'center',
  },
  startLoggingButtonText: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
  stopLoggingButtonTouchable: {
    borderRadius: 12,
    backgroundColor: '#fd4a4a',
    height: 52,
    alignSelf: 'center',
    width: 300,
    justifyContent: 'center',
  },
  stopLoggingButtonText: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#ffffff',
  },
  listPastConnections: {
      width: "80%",
      height: 200
  },
  itemPastConnections: {
      padding: 3,
      fontSize: 18,
      fontWeight: '400',
  },
});

export default Entry;
