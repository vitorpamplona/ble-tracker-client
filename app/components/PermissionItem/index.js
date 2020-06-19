import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "./styles";

function PermissionItem({ granted, label, onPress }) {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
      disabled={granted}
    >
      <View style={[styles.checkbox, granted && styles.checked]} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

export default PermissionItem;
