import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import { WIDTH } from "../../constants/dimensions";

const styles = StyleSheet.create({
  iconWrapper: {
    zIndex: 1,
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
    flex: 1,
    position: "relative",
    marginBottom: 150,
    width: "100%",
  },
  indicatorDot: {
    width: 16,
    height: 16,
    backgroundColor: colors.skyBlue,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: colors.white,
  },
  trackingIndicator: {
    backgroundColor: colors.white,
    height: WIDTH + 20,
    width: WIDTH + 20,
    borderRadius: (WIDTH + 20) / 2,
    position: "absolute",
    zIndex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    alignItems: "center",
  },
  copy: {
    color: colors.white,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 23,
    marginBottom: 20,
  },
  serverStatus: {
    paddingVertical: 13,
    paddingHorizontal: 9,
    backgroundColor: colors.green,
    borderRadius: 5,
  },
  serverStatusInactive: {
    backgroundColor: colors.error,
  },
  serverStatusText: {
    fontSize: 12,
    color: colors.white,
    lineHeight: 16,
    fontWeight: "bold",
  },
});

export default styles;
