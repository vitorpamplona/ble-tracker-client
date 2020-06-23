import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { View, Text, Animated, Easing } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../constants/colors";
import styles from "./styles";

function TrackingStatus({ server, isTracking }) {
  const scaleAnimation = new Animated.Value(1);
  const indicatorOpcaity = scaleAnimation.interpolate({
    inputRange: [1, 2.5],
    outputRange: [0.8, 0.01],
    extrapolate: "clamp",
  });

  function animateIdicator() {
    scaleAnimation.setValue(1);
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(scaleAnimation, {
        toValue: 2.5,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (isTracking) {
        animateIdicator();
      }
    });
  }

  useEffect(() => {
    if (isTracking) {
      animateIdicator();
    }
  }, [isTracking]);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.iconWrapper, !isTracking && styles.iconError]}>
        {isTracking && (
          <Animated.View
            style={[
              styles.trackingIndicator,
              {
                transform: [{ scale: scaleAnimation }],
                opacity: indicatorOpcaity,
              },
            ]}
          />
        )}
        <Ionicons
          name={isTracking ? "ios-bluetooth" : "ios-close"}
          color={colors.white}
          size={34}
        />
      </View>
      {isTracking ? (
        <Text
          style={styles.label}
        >{`You are being tracked by server: ${server}`}</Text>
      ) : (
        <Text style={styles.label}>You are not tracked at the moment</Text>
      )}
    </View>
  );
}

TrackingStatus.propTypes = {
  server: PropTypes.string.isRequired,
  isTracking: PropTypes.bool,
};

export default TrackingStatus;
