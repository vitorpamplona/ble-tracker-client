import React from "react";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../constants/colors";
import styles from "./styles";

function Checkbox({ checked }) {
  return (
    <View style={[styles.checkbox, checked && styles.checked]}>
      {checked && (
        <Ionicons name="ios-checkmark" color={colors.blue} size={24} />
      )}
    </View>
  );
}

export default Checkbox;
