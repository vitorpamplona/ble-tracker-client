import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: colors.white,
  },
});

export default styles;
