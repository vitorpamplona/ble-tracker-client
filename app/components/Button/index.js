import React from "react";

import styles from "./styles";
import { TouchableOpacity, Text } from "react-native";
import colors from "../../constants/colors";

function Button({ style, onPress, label, ...props }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      {...props}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

export default Button;
