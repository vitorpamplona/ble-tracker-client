import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.blue,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  pdf: {
    flex: 1,
  },
  license: {
    color: colors.white,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  acceptTouchable: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  acceptText: {
    color: colors.white,
    fontSize: 20,
    marginLeft: 10,
  },
  helperText: {
    color: "#ccc",
    marginBottom: 10,
  },
});

export default styles;
