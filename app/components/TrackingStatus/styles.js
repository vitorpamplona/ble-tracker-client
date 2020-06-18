import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  iconWrapper: {
    backgroundColor: colors.blue,
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  label: {
    fontSize: 18,
    textAlign: "center",
  },
  iconError: {
    backgroundColor: colors.error,
  },
});

export default styles;
