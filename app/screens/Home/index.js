import React, { Component } from "react";

import ContactItem from "../../components/ContactItem";
import TrackingStatus from "../../components/TrackingStatus";
import Button from "../../components/Button";
import { SafeAreaView, View, Text, ScrollView } from "react-native";

import Moment from "moment";
import update from "immutability-helper";
import { connect } from "react-redux";

import {
  hasPhonePermission,
  hasLocationPermission,
} from "../../services/PermissionRequests";

import BLEBackgroundService from "../../services/BLEBackgroundService";

import {
  SERVER,
  sync,
  isOnline,
  readyToUploadCounter,
} from "../../helpers/SyncDB";
import styles from "./styles";
import colors from "../../constants/colors";

const c1MIN = 1000 * 60;

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceSerial: "",
      devicesFound: [],
      scanStatus: "",
      broadcastStatus: "",
      bluetoothStatus: "",
      locationPermission: false,
      phonePermission: false,
      readyToUpload: 0,
      lastRefreshReadyToUpload: 0,
    };
  }

  refreshReadyToUpload() {
    if (this.state.lastRefreshReadyToUpload < new Date().getTime() - c1MIN) {
      readyToUploadCounter().then((toUpload) => {
        this.setState({
          readyToUpload: toUpload,
          lastRefreshReadyToUpload: new Date().getTime(),
        });
      });
    }
  }

  onDevice(device) {
    let index = -1;
    console.log(device);
    for (let i = 0; i < this.state.devicesFound.length; i++) {
      if (this.state.devicesFound[i].serial == device.serial) {
        index = i;
      }
    }
    if (index < 0) {
      let dev = {
        serial: device.serial,
        name: device.name,
        rssi: device.rssi,
        start: device.date,
        end: device.date,
      };
      this.setState({
        devicesFound: update(this.state.devicesFound, { $push: [dev] }),
      });
    } else {
      const itemIndex = index;
      this.setState({
        devicesFound: update(this.state.devicesFound, {
          [itemIndex]: {
            end: { $set: device.date },
            rssi: {
              $set: device.rssi || this.state.devicesFound[itemIndex].rssi,
            },
          },
        }),
      });
    }

    this.refreshReadyToUpload();
  }

  onScanStatus(status) {
    this.setState({
      scanStatus: status.toString(),
      isLogging: status.toString() === "Started",
    });
  }

  onBroadcastStatus(status) {
    this.setState({
      broadcastStatus: status.toString(),
      isLogging: status.toString() === "Started",
    });
  }

  onBluetoothStatus(status) {
    this.setState({
      bluetoothStatus: status.toString(),
    });
  }

  componentDidMount() {
    BLEBackgroundService.init();
    BLEBackgroundService.addNewDeviceListener(this);
    BLEBackgroundService.requestBluetoothStatus();
    BLEBackgroundService.setServicesUUID(this.props.deviceId);
    this.start();

    hasLocationPermission().then((result) => {
      this.setState({
        locationPermission: result,
      });
    });
    hasPhonePermission().then((result) => {
      this.setState({
        phonePermission: result,
      });
    });

    this.refreshReadyToUpload();
  }

  componentWillUnmount() {
    BLEBackgroundService.removeNewDeviceListener(this);
  }

  start() {
    BLEBackgroundService.enableBT();

    isOnline()
      .then((response) => {
        if (response.status == 200) {
          // is online
          console.log("[Entry] Server is online, starting to track");
          BLEBackgroundService.start();

          this.setState({
            isLogging: true,
          });

          sync();
        } else {
          console.log("[Entry] Server Offline, stopping");
          this.stop();
        }
      })
      .catch((error) => {
        console.log("[Entry] Not online, stopping");
        this.stop();
      });
  }

  stop() {
    BLEBackgroundService.stop();

    this.setState({
      isLogging: false,
    });
  }

  onClearArray = () => {
    this.setState({ devicesFound: [] });
  };

  dateDiffSecs(start, end) {
    return Math.floor((end.getTime() - start.getTime()) / 1000);
  }

  dateStr(dt) {
    return Moment(dt).format("H:mm:ss");
  }

  render() {
    const { isLogging, devicesFound } = this.state;

    return (
      <SafeAreaView>
        <View style={styles.body}>
          <TrackingStatus server={SERVER} isTracking={isLogging} />
          <ScrollView style={[styles.sectionContainer, { flex: 1 }]}>
            <Text style={styles.sectionTitle}>BCH Contact Tracer</Text>
            <Text style={styles.sectionDescription}>
              Broadcasting:
              <Text style={styles.highlight}> {this.props.deviceId}</Text>
            </Text>
            <Text style={styles.sectionDescription}>
              Broadcast:
              <Text style={styles.highlight}>
                {" "}
                {this.state.broadcastStatus}
              </Text>
              , Scan:
              <Text style={styles.highlight}> {this.state.scanStatus}</Text>
            </Text>
            <Text style={styles.sectionDescription}>
              BT:
              <Text style={styles.highlight}>
                {" "}
                {this.state.bluetoothStatus}
              </Text>
              , Loc:
              <Text style={styles.highlight}>
                {" "}
                {this.state.locationPermission}
              </Text>
              , Phone:
              <Text style={styles.highlight}>
                {" "}
                {this.state.phonePermission}
              </Text>
            </Text>
            <Text style={styles.sectionDescription}>
              Contacts To Upload:
              <Text style={styles.highlight}> {this.state.readyToUpload}</Text>
            </Text>

            <View style={styles.sectionContainerFlex}>
              <Text style={styles.sectionTitle}>Last Seen</Text>
              {devicesFound.map((device, i) => (
                <ContactItem key={i} device={device} />
              ))}
            </View>
          </ScrollView>

          <View style={styles.sectionContainer}>
            <Button
              background={colors.blue}
              labelColor={colors.white}
              onPress={this.onClearArray}
              label="Clear devices"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  deviceId: state.device.deviceId,
});

export default connect(mapStateToProps)(Entry);
