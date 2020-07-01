import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import fontNames from "../../constants/fontNames";

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: colors.yellow,
    borderRadius: 15,
    marginRight: 16,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: colors.yellow,
  },
  label: {
    color: colors.white,
    fontSize: 15,
    fontFamily: fontNames.OpenSans.bold,
  },
});

export default styles;
