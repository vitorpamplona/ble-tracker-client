import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import { WIDTH } from "../../constants/dimensions";
import fontNames from "../../constants/fontNames";

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    color: colors.dark,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: fontNames.OpenSans.bold,
    textAlign: "center",
    marginBottom: 10,
  },
  sectionDescription: {
    color: colors.darkGrey,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fontNames.OpenSans.bold,
    marginBottom: 10,
  },
  highlight: {
    color: colors.dark,
  },
});

export default styles;
