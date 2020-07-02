import React from "react";
import moment from "moment";

import { Text, View } from "react-native";
import styles from "./styles";

function ContactItem({ device }) {
  return (
    <View style={styles.contactWrapper}>
      <View style={styles.nameWrapper}>
        <Text style={styles.name}>Device ({device.rssi})</Text>
      </View>
      <Text style={styles.time}>
        {moment(device.end).format("hh:mm")}
        <Text style={styles.timeRelative}>
          ({moment(device.end).fromNow()})
        </Text>
      </Text>
    </View>
  );
}

export default ContactItem;
