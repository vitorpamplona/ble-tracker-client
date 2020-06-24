import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import styles from "./styles";
import AnimatedCircle from "./AnimatedCircle";
import Animated from "react-native-reanimated";
import { mix, loop } from "react-native-redash";

const { Value, useCode, set } = Animated;

function TrackingStatus({ server, isTracking }) {
  const animation = new Value(0);

  useCode(() => set(animation, loop({ duration: 1000, boomerang: true })), []);

  const dotScale = isTracking ? mix(animation, 1, 1.5) : 1;

  return (
    <View style={styles.wrapper}>
      {isTracking &&
        new Array(5)
          .fill(0)
          .map((_, i) => <AnimatedCircle key={i} delayTime={i * 1200} />)}
      <View style={[styles.iconWrapper]}>
        <Animated.View
          style={[styles.indicatorDot, { transform: [{ scale: dotScale }] }]}
        />
      </View>
    </View>
  );
}

TrackingStatus.propTypes = {
  server: PropTypes.string.isRequired,
  isTracking: PropTypes.bool,
};

export default TrackingStatus;
