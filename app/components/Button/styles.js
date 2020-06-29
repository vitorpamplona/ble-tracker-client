import { StyleSheet } from "react-native";
import fontNames from "../../constants/fontNames";

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    height: 52,
    alignSelf: "center",
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
    fontFamily: fontNames.OpenSans.bold,
  },
  disabled: {
    backgroundColor: "rgba(220, 220, 220, 0.3)",
  },
});

export default styles;
