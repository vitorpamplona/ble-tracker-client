import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 10,
    marginRight: 20,
  },
  checked: {
    borderWidth: 6,
  },
  label: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
});

export default styles;
