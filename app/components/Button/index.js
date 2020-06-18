import React from "react";

import styles from "./styles";
import { TouchableOpacity, Text } from "react-native";
import colors from "../../constants/colors";

function Button({
  style,
  onPress,
  label,
  background = colors.white,
  labelColor = colors.blue,
  ...props
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: background }, style]}
      {...props}
    >
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default Button;
