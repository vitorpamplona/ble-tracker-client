import React from "react";
import { View, Text } from "react-native";

const styles = {};

function TrackingInfo({
  deviceId,
  broadcastStatus,
  scanStatus,
  bluetoothStatus,
  locationPermission,
  phonePermission,
}) {
  return (
    <View>
      <Text style={styles.sectionDescription}>
        Broadcasting:
        <Text style={styles.highlight}> {deviceId}</Text>
      </Text>
      <Text style={styles.sectionDescription}>
        Broadcast:
        <Text style={styles.highlight}> {broadcastStatus}</Text>, Scan:
        <Text style={styles.highlight}> {scanStatus}</Text>
      </Text>
      <Text style={styles.sectionDescription}>
        BT:
        <Text style={styles.highlight}> {bluetoothStatus}</Text>, Loc:
        <Text style={styles.highlight}> {locationPermission}</Text>, Phone:
        <Text style={styles.highlight}> {phonePermission}</Text>
      </Text>
    </View>
  );
}

export default TrackingInfo;
