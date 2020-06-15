import React from "react";

import styles from "./styles";
import { TextInput } from "react-native";
import colors from "../../constants/colors";

function Input({ style, placeholderTextColor = colors.white, ...props }) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={placeholderTextColor}
      {...props}
    />
  );
}

export default Input;
