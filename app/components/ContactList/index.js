import React from "react";
import { ScrollView, View, Text } from "react-native";
import ContactItem from "../ContactItem";
import styles from "./styles";

function ContactList({ devices }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, paddigTop: 10 }}>
      {devices.length ? (
        devices.map((device, i) => <ContactItem device={device} key={i} />)
      ) : (
        <View style={styles.noDevicesWrapper}>
          <Text style={styles.noDevicesText}>No devices within range</Text>
        </View>
      )}
    </ScrollView>
  );
}

export default ContactList;
