import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import fontNames from "../../constants/fontNames";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.blue,
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
    marginBottom: 50,
    paddingHorizontal: 30,
    position: "relative",
  },
  circles: {
    flex: 1,
    position: "absolute",
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    color: colors.white,
    fontFamily: fontNames.OpenSans.bold,
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 50,
  },
  button: {
    marginTop: 30,
  },
});

export default styles;
