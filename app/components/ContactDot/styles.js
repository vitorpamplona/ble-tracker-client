import { StyleSheet, Platform } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    zIndex: Platform.OS === "android" ? undefined : 2,
  },
  dotWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 99,
    width: 30,
    height: 30,
    top: 0,
    left: 0,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: colors.white,
    borderWidth: 4,
    borderColor: colors.yellow,
    elevation: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "rgba(255, 255, 255, 0.6)",
    shadowOpacity: 1.0,
    shadowRadius: 6,
  },
  nameWrapper: {
    backgroundColor: colors.white,
    padding: 8,
    borderRadius: 5,
    position: "absolute",
    top: 0,
    minWidth: 180,
    left: -90,
  },
  deviceName: {
    color: colors.dark,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default styles;
