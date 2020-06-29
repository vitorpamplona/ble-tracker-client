import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { WIDTH } from "../../constants/dimensions";

const POPUP_WIDTH = 180;

function ContactDot({ top = 0, left = 0, deviceName, rssi }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const [popupPosition, setPopupPosition] = useState({
    top: -50,
    left: -POPUP_WIDTH / 2,
  });

  useEffect(() => {
    ref.current.measure((fx, fy, width, height, px, py) => {
      const rightPopupEdge = px + POPUP_WIDTH / 2;
      const leftPopupEdge = px - POPUP_WIDTH / 2;

      if (rightPopupEdge > WIDTH) {
        setPopupPosition({
          ...popupPosition,
          left: -POPUP_WIDTH / 2 - (rightPopupEdge - WIDTH),
        });
      }

      if (leftPopupEdge < 0) {
        setPopupPosition({
          ...popupPosition,
          left: -POPUP_WIDTH / 2 + -leftPopupEdge,
        });
      }
    });
  }, [ref.current]);

  return (
    <View style={[styles.wrapper, { top, left }]} ref={ref}>
      {open && (
        <View
          style={[
            styles.nameWrapper,
            { left: popupPosition.left, top: popupPosition.top },
          ]}
        >
          <Text style={styles.deviceName}>
            {deviceName} ({rssi})
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={styles.dotWrapper}
      >
        <View style={styles.dot} />
      </TouchableOpacity>
    </View>
  );
}

export default ContactDot;
