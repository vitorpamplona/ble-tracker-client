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
import update from 'immutability-helper';

import { requestLocationPermission, hasPhonePermission, hasLocationPermission } from './services/PermissionRequests';

import BLEBackgroundService from './services/BLEBackgroundService';

import DeviceInfo from 'react-native-device-info';
import { SERVER, sync } from './helpers/SyncDB';

import {
  Header,
  Colors
} from 'react-native/Libraries/NewAppScreen';

class Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceSerial:'',
            devicesFound:[], 
            scanStatus:'',
            broadcastStatus:'', 
            bluetoothStatus:'',
            locationPermission: false,
            phonePermission: false,
        }
    }

    onDevice(device) {
      let index = -1;
      for(let i=0; i< this.state.devicesFound.length; i++){
        if (this.state.devicesFound[i].serial == device.serial) {
          index = i;
        }
      }
      if (index<0) {
        let dev = {serial:device.serial, name:device.name, rssi:device.rssi, start:device.date, end:device.date};
        this.setState({
          devicesFound: update(this.state.devicesFound, 
            {$push: [dev]}
          )
        });
      } else {
        const itemIndex = index;
        this.setState({
          devicesFound: update(this.state.devicesFound, 
            {[itemIndex]: {end: {$set: device.date}, rssi: {$set: device.rssi || this.state.devicesFound[itemIndex].rssi }}}
          )
        });
      }
    }

    onScanStatus(status) {
      this.setState({
        scanStatus: status.toString()
      });
    }

    onBroadcastStatus(status) {
      this.setState({
        broadcastStatus: status.toString()
      });
    }

    onBluetoothStatus(status) {
      this.setState({
        bluetoothStatus: status.toString()
      });
    }

    setID(id) {
      this.setState({ deviceSerial: id });
      BLEBackgroundService.setServicesUUID(id);
      this.start(); 
    }

    componentDidMount(){
      BLEBackgroundService.init();
      BLEBackgroundService.addNewDeviceListener(this);
      BLEBackgroundService.requestBluetoothStatus();  

      requestLocationPermission().then(() => {
        hasLocationPermission().then(result => {
          this.setState({
            locationPermission: result
          });
        });
        hasPhonePermission().then(result => {
          this.setState({
            phonePermission: result
          });
        });  
        let serialNumber = DeviceInfo.getSerialNumber().then(deviceSerial => {
          if (deviceSerial && deviceSerial !== "unknown") { 
            this.setID(deviceSerial);
          } else {
            DeviceInfo.getDeviceName().then(deviceName => {
               this.setID(deviceName);
            });
          }
        });
      });
    }
    
    componentWillUnmount() { 
      BLEBackgroundService.removeNewDeviceListener(this);
    }

    start() {
      BLEBackgroundService.enableBT();
      BLEBackgroundService.start();

      this.setState({
        isLogging: true,
      });

      sync();
    }

    stop(){
      BLEBackgroundService.stop();

      this.setState({
        isLogging: false,
      });

      sync();
    }

    onClearArray = () => {
      this.setState({ devicesFound: [] });
    };

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
                <Text style={styles.highlight}> { this.state.deviceSerial }</Text>
              </Text>
              <Text style={styles.sectionDescription}>
                Server: <Text style={styles.highlight}>{ SERVER }</Text>
              </Text>
              <Text style={styles.sectionDescription}>
                Version: 
                <Text style={styles.highlight}> { DeviceInfo.getVersion() }</Text>
              </Text>
              <Text style={styles.sectionDescription}>
                Broadcasting: 
                <Text style={styles.highlight}> { this.state.broadcastStatus }</Text>
              </Text>
              <Text style={styles.sectionDescription}>
                Scan: 
                <Text style={styles.highlight}> { this.state.scanStatus }</Text>
              </Text>
              <Text style={styles.sectionDescription}>
                Location: 
                <Text style={styles.highlight}> { this.state.locationPermission }</Text>
              </Text>
              <Text style={styles.sectionDescription}>
                Phone: 
                <Text style={styles.highlight}> { this.state.phonePermission }</Text>
              </Text>
              <Text style={styles.sectionDescription}>
                Bluetooth: 
                <Text style={styles.highlight}> { this.state.bluetoothStatus }</Text>
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
                  renderItem={({item}) => <Text style={styles.itemPastConnections}>{this.dateStr(item.start)} ({this.dateDiffSecs(item.start, item.end)}s): {item.serial} {item.rssi}</Text>}
                  keyExtractor={item => item.serial}
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
