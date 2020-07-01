import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import fontNames from "../../constants/fontNames";

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  input: {
    color: colors.dark,
    fontSize: 15,
    borderRadius: 5,
    backgroundColor: colors.white,
    height: 50,
    paddingHorizontal: 15,
  },
  label: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 10,
    fontFamily: fontNames.OpenSans.bold,
    textAlign: "left",
  },
});

export default styles;
