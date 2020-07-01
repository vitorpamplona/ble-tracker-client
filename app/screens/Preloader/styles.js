import { StyleSheet } from "react-native";
import colors from "../../constants/colors";
import fontNames from "../../constants/fontNames";

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
  text: {
    fontSize: 28,
    color: colors.white,
    fontFamily: fontNames.OpenSans.regular,
    textAlign: "center",
  },
  circles: {
    flex: 1,
    alignSelf: "center",
    marginVertical: 40,
  },
});

export default styles;
