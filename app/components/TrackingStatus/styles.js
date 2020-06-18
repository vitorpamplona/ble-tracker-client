import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  iconWrapper: {
    backgroundColor: colors.blue,
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  label: {
    fontSize: 18,
    textAlign: "center",
  },
  iconError: {
    backgroundColor: colors.error,
  },
  trackingIndicator: {
    backgroundColor: colors.blue,
    height: 80,
    width: 80,
    borderRadius: 40,
    position: "absolute",
    zIndex: 0,
  },
});

export default styles;
