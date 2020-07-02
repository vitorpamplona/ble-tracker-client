import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import fontNames from "../../constants/fontNames";

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    lineHeight: 38,
    fontFamily: fontNames.OpenSans.bold,
    marginBottom: 25,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  linkText: {
    paddingVertical: 5,
    color: colors.dark,
    textAlign: "center",
    marginTop: 10,
    fontFamily: fontNames.OpenSans.regular,
  },
});

export default styles;
