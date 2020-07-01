import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

function TrackingInfo({ deviceId, broadcastStatus, scanStatus, toUpload = 0 }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>BCH Concact Tracer</Text>
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
        Contacts to upload:
        <Text style={styles.highlight}> {toUpload}</Text>
      </Text>
    </View>
  );
}

export default TrackingInfo;
