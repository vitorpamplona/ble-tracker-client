import React from "react";

import styles from "./styles";
import { TouchableOpacity, Text } from "react-native";
import colors from "../../constants/colors";

function Button({
  style,
  onPress,
  label,
  background = colors.yellow,
  labelColor = colors.dark,
  disabled,
  ...props
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: background },
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default Button;
