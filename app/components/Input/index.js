import React from "react";

import styles from "./styles";
import { TextInput, Text, View } from "react-native";
import colors from "../../constants/colors";

function Input({
  style,
  label,
  placeholderTextColor = colors.lightGrey,
  ...props
}) {
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
    </View>
  );
}

export default Input;
