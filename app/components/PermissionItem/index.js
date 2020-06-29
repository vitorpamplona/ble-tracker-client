import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import colors from "../../constants/colors";

function PermissionItem({ granted, label, onPress }) {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
      disabled={granted}
    >
      <View style={[styles.checkbox, granted && styles.checked]}>
        {granted && (
          <Ionicons name="ios-checkmark" color={colors.dark} size={30} />
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

export default PermissionItem;
