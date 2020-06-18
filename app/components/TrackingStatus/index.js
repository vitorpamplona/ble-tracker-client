import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../constants/colors";
import styles from "./styles";

function TrackingStatus({ server, isTracking }) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.iconWrapper, !isTracking && styles.iconError]}>
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
