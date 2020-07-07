import React, { useEffect, useRef } from "react";

import { TouchableOpacity, Animated } from "react-native";
import styles from "./styles";
import colors from "../../constants/colors";

function ToggleSwitch({ checked, onPress = () => ({}) }) {
  const animation = useRef(new Animated.Value(checked ? 1 : 0)).current;

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 21],
    extrapolate: "clamp",
  });

  const turnOff = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const turnOn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (checked) turnOn();
    else turnOff();
  }, [checked]);

  return (
    <TouchableOpacity
      style={[
        styles.switch,
        { backgroundColor: checked ? colors.green : colors.error },
      ]}
      onPress={onPress}
    >
      <Animated.View style={[styles.circle, { transform: [{ translateX }] }]} />
    </TouchableOpacity>
  );
}

export default ToggleSwitch;
