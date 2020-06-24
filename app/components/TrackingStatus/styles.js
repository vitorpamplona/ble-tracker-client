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
    zIndex: 2,
  },
});

export default styles;
