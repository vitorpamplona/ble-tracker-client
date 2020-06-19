import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    height: 52,
    alignSelf: "center",
    width: "100%",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "center",
  },
  disabled: {
    backgroundColor: "rgba(220, 220, 220, 0.3)",
  },
});

export default styles;
