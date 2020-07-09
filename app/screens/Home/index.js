import React, { Component } from "react";

import TrackingStatus from "../../components/TrackingStatus";
import ContactList from "../../components/ContactList";
import BottomSheet from "reanimated-bottom-sheet";
import TrackingInfo from "../../components/TrackingInfo";
import ToggleSwitch from "../../components/ToggleSwitch";
import {
  View,
  SafeAreaView,
  Text,
  StatusBar,
  Platform,
  AppState,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Logo from "../../../assets/images/logo.svg";
import NotifService from "../../services/NotificationService";
import NetInfo from "@react-native-community/netinfo";
import BackgroundTaskServices from "../../services/BackgroundTaskService";

import Moment from "moment";
import update from "immutability-helper";
import { connect } from "react-redux";

import {
  hasPhonePermission,
  hasLocationPermission,
} from "../../services/PermissionRequests";
import { resetEmployeeValues } from "../../actions/device";

import BLEBackgroundService from "../../services/BLEBackgroundService";

import { sync, isOnline, readyToUploadCounter } from "../../helpers/SyncDB";
import styles from "./styles";
import colors from "../../constants/colors";
import { calculatePosition } from "../../helpers/DeviceDotsPosition";
import screenNames from "../../constants/screenNames";
import { isSmallDevice } from "../../constants/dimensions";

const c1MIN = 1000 * 60;
const PushNotification = new NotifService();

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
      appState: AppState.currentState,
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

    for (let i = 0; i < this.state.devicesFound.length; i++) {
      if (this.state.devicesFound[i].serial == device.serial) {
        index = i;
      }
    }

    const position = calculatePosition(device.rssi);

    if (index < 0) {
      let dev = {
        serial: device.serial,
        name: device.name,
        rssi: device.rssi,
        start: device.date,
        end: device.date,
        position,
      };
      this.setState({
        devicesFound: update(this.state.devicesFound, { $push: [dev] }),
      });
    } else {
      const itemIndex = index;
      const { position: currentPosition } = this.state.devicesFound[itemIndex];
      this.setState({
        devicesFound: update(this.state.devicesFound, {
          [itemIndex]: {
            end: { $set: device.date },
            rssi: {
              $set: device.rssi || this.state.devicesFound[itemIndex].rssi,
            },
            position: {
              $set:
                currentPosition.radius === position.radius
                  ? currentPosition
                  : position,
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

  startBroadcasting = () => {
    const { employeeId, ipAddress } = this.props;
    BLEBackgroundService.start({ employeeId, ipAddress });
    this.setState({
      isLogging: true,
    });
  };

  stopBroadcasting = () => {
    BLEBackgroundService.stop();
    this.setState({
      isLogging: false,
      devicesFound: [],
    });
  };

  scheduleNotifications = () => {
    PushNotification.cancelAll();
    PushNotification.scheduleNotif();

    setTimeout(() => {
      this.scheduleNotifications();
    }, 15 * 60 * 1000);
  };

  componentDidMount() {
    const { employeeId, ipAddress, server } = this.props;
    BackgroundTaskServices.start({
      server,
      employeeId,
      ipAddress,
      onStop: this.stopBroadcasting,
    });
    BLEBackgroundService.init();
    BLEBackgroundService.addNewDeviceListener(this);
    BLEBackgroundService.requestBluetoothStatus();
    BLEBackgroundService.setServicesUUID(this.props.deviceId);
    this.start({});

    NetInfo.addEventListener(this.handleConnectionStateChange);
    AppState.addEventListener("change", this.handleAppStateChange);

    // if (Platform.OS === "ios") this.scheduleNotifications();

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

  handleConnectionStateChange = async () => {
    this.checkServerStatusAndSetBroadcasting();
  };

  handleAppStateChange = async (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.checkServerStatusAndSetBroadcasting();
    }

    this.setState({ appState: nextAppState });
  };

  checkServerStatusAndSetBroadcasting = async () => {
    try {
      const { details } = await NetInfo.fetch();

      if (details && details.ipAddress) {
        const serverStatus = await isOnline(this.props.server);

        if (serverStatus.status === 200 && !this.state.isLogging)
          this.startBroadcasting();
        else if (serverStatus.status !== 200 && this.state.isLogging)
          this.stopBroadcasting();
      } else {
        this.stopBroadcasting();
      }
    } catch (error) {
      this.stopBroadcasting();
    }
  };

  componentWillUnmount() {
    BLEBackgroundService.removeNewDeviceListener(this);
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  start() {
    BLEBackgroundService.enableBT();

    const { employeeId, ipAddress } = this.props;

    isOnline(this.props.server)
      .then((response) => {
        if (response.status == 200) {
          // is online
          console.log("[Entry] Server is online, starting to track");

          BLEBackgroundService.start({ employeeId, ipAddress });

          this.setState({
            isLogging: true,
          });

          sync(this.props.server);
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

  handleBroadcastToggle = () =>
    this.state.isLogging
      ? this.stopBroadcasting()
      : this.checkServerStatusAndSetBroadcasting();

  render() {
    const {
      isLogging,
      devicesFound,
      scanStatus,
      broadcastStatus,
      bluetoothStatus,
      locationPermission,
      phonePermission,
      readyToUpload,
    } = this.state;
    const { server, deviceId } = this.props;

    return (
      <View style={styles.screen}>
        <SafeAreaView style={styles.wrapper}>
          <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
          <View style={styles.header}>
            <Logo width={220} height={42} />
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate(screenNames.SETTINGS)
              }
            >
              <Ionicons name="ios-settings" color={colors.white} size={30} />
            </TouchableOpacity>
          </View>
          <TrackingStatus
            server={server}
            isTracking={isLogging}
            devices={devicesFound}
          />
        </SafeAreaView>
        <BottomSheet
          snapPoints={["80%", isSmallDevice ? 80 : 190]}
          initialSnap={1}
          renderContent={() => (
            <View style={styles.bottomSheet}>
              <SafeAreaView>
                <Text style={styles.title}>
                  Devices around{" "}
                  <Text style={styles.counter}>({devicesFound.length})</Text>
                </Text>
                <TouchableOpacity
                  style={styles.broadcastingStatus}
                  onPress={this.handleBroadcastToggle}
                >
                  <ToggleSwitch
                    checked={isLogging}
                    onPress={this.handleBroadcastToggle}
                  />
                  <Text style={styles.statusText}>
                    {isLogging
                      ? "Broadcasting Active"
                      : "Broadcasting Inactive"}
                  </Text>
                </TouchableOpacity>
                <ContactList devices={devicesFound} />
                <TrackingInfo
                  deviceId={deviceId}
                  broadcastStatus={broadcastStatus}
                  scanStatus={scanStatus}
                  bluetoothStatus={bluetoothStatus}
                  locationPermission={locationPermission}
                  phonePermission={phonePermission}
                  toUpload={readyToUpload}
                />
              </SafeAreaView>
            </View>
          )}
          renderHeader={() => (
            <View style={styles.bottomSheetHeader}>
              <View style={styles.bottomSheetHandle} />
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  deviceId: state.device.deviceId,
  server: state.device.server,
  employeeId: state.device.employeeId,
  ipAddress: state.device.ipAddress,
});

const mapDispatchToProps = (dispatch) => ({
  resetEmployeeValues: () => dispatch(resetEmployeeValues()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
