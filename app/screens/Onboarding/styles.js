import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import fontNames from "../../constants/fontNames";
import { isSmallDevice } from "../../constants/dimensions";

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.blue,
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    top: 30,
    left: 20,
    marginBottom: 34,
  },
  content: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 30,
    marginBottom: isSmallDevice ? 30 : 50,
  },
  copy: {
    fontSize: isSmallDevice ? 24 : 28,
    color: colors.white,
    fontFamily: fontNames.OpenSans.bold,
  },
  circles: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: isSmallDevice ? 30 : 50,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 23,
    color: colors.white,
    fontFamily: fontNames.OpenSans.regular,
    marginBottom: isSmallDevice ? 30 : 50,
  },
});

export default styles;
