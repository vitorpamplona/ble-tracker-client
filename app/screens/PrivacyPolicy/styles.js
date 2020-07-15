import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.blue,
    flex: 1,
    paddingHorizontal: 20,
  },
  pdf: {
    flex: 1,
    marginTop: 20,
  },
  license: {
    color: colors.white,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  acceptTouchable: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  acceptText: {
    color: colors.white,
    fontSize: 18,
    marginLeft: 10,
  },
  helperText: {
    color: "#ccc",
    marginBottom: 20,
  },
  backButton: {
    marginTop: 20,
  },
});

export default styles;
