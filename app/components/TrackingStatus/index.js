import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import styles from "./styles";
import AnimatedCircle from "./AnimatedCircle";
import ContactDot from "../ContactDot";
import Animated from "react-native-reanimated";
import { mix, loop } from "react-native-redash";
import { calculatePosition } from "../../helpers/DeviceDotsPosition";
const { Value, useCode, set } = Animated;

function TrackingStatus({ devices = [], isTracking }) {
  const animation = new Value(0);

  useCode(() => set(animation, loop({ duration: 1000, boomerang: true })), []);

  const dotScale = mix(animation, 1, 1.5);

  return (
    <View style={styles.wrapper}>
      {isTracking ? (
        new Array(5)
          .fill(0)
          .map((_, i) => <AnimatedCircle key={i} delayTime={i * 1200} />)
      ) : (
        <View style={styles.inactiveCircle} />
      )}

      {devices.map(({ position, serial, rssi }, i) => (
        <ContactDot
          top={position.top}
          left={position.left}
          key={i}
          deviceName={serial}
          rssi={rssi}
        />
      ))}
      <View style={[styles.iconWrapper]}>
        <Animated.View
          style={[styles.indicatorDot, { transform: [{ scale: dotScale }] }]}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.copy}>
          Contact Tracing is saving the persons you come in contact with and storing them on
          this phone.
        </Text>
      </View>
    </View>
  );
}

TrackingStatus.propTypes = {
  server: PropTypes.string.isRequired,
  isTracking: PropTypes.bool,
};

export default TrackingStatus;
