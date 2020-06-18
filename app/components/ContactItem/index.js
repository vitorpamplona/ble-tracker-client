import React from "react";
import moment from "moment";

import { Text, View } from "react-native";
import styles from "./styles";

function ContactItem({ device }) {
  return (
    <View style={styles.contactWrapper}>
      <Text style={styles.id}>{device.serial}</Text>
      <View style={styles.footer}>
        <Text>Recent contact: {moment(device.end).format("HH:mm:ss")}</Text>
        <Text>RSSI: {device.rssi}</Text>
      </View>
    </View>
  );
}

export default ContactItem;
