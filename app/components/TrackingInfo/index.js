import React from "react";

function TrackingInfo() {
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
