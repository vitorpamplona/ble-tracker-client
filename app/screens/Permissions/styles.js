import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import fontNames from "../../constants/fontNames";

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.blue,
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
    justifyContent: "flex-end",
    flexDirection: "column",
    paddingHorizontal: 30,
    marginBottom: 50,
  },
  copy: {
    fontSize: 28,
    color: colors.white,
    fontFamily: fontNames.OpenSans.bold,
    marginBottom: 30,
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  helperText: {
    color: "#ccc",
    fontSize: 13,
    textAlign: "center",
    marginTop: 5,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 23,
    color: colors.white,
    fontFamily: fontNames.OpenSans.regular,
    marginBottom: 30,
  },
});

export default styles;
